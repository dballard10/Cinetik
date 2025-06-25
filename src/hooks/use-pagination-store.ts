import { create } from "zustand";
import { favoritesApi, watchesApi } from "@/services/api-client";

interface PaginationStore {
  highestRatedMoviesPage: number;
  trendingMoviesPage: number;
  highestRatedSeriesPage: number;
  trendingSeriesPage: number;
  trendingPage: number;
  searchPage: number;
  filteredPage: number;
  filteredBothPage: number;
  favoritesPage: number;
  watchesPage: number;
  favoritesTotalPages: number;
  watchesTotalPages: number;
  setHighestRatedMoviesPage: (page: number) => void;
  setHighestRatedSeriesPage: (page: number) => void;
  setTrendingMoviesPage: (page: number) => void;
  setTrendingSeriesPage: (page: number) => void;
  setTrendingPage: (page: number) => void;
  setSearchPage: (page: number) => void;
  setFilteredPage: (page: number) => void;
  setFilteredBothPage: (page: number) => void;
  setFavoritesPage: (page: number) => void;
  setWatchesPage: (page: number) => void;
  setFavoritesTotalPages: (pages: number) => void;
  setWatchesTotalPages: (pages: number) => void;
  fetchFavoritesPagination: () => Promise<void>;
  fetchWatchesPagination: () => Promise<void>;
}

export const usePaginationStore = create<PaginationStore>((set, get) => ({
  highestRatedMoviesPage: 1,
  trendingMoviesPage: 1,
  highestRatedSeriesPage: 1,
  trendingSeriesPage: 1,
  trendingPage: 1,
  searchPage: 1,
  filteredPage: 1,
  filteredBothPage: 1,
  favoritesPage: 1,
  watchesPage: 1,
  favoritesTotalPages: 1,
  watchesTotalPages: 1,
  setHighestRatedMoviesPage: (page) => set({ highestRatedMoviesPage: page }),
  setHighestRatedSeriesPage: (page) => set({ highestRatedSeriesPage: page }),
  setTrendingMoviesPage: (page) => set({ trendingMoviesPage: page }),
  setTrendingSeriesPage: (page) => set({ trendingSeriesPage: page }),
  setTrendingPage: (page) => set({ trendingPage: page }),
  setSearchPage: (page) => set({ searchPage: page }),
  setFilteredPage: (page) => set({ filteredPage: page }),
  setFilteredBothPage: (page) => set({ filteredBothPage: page }),
  setFavoritesPage: (page) => set({ favoritesPage: page }),
  setWatchesPage: (page) => set({ watchesPage: page }),
  setFavoritesTotalPages: (pages) => set({ favoritesTotalPages: pages }),
  setWatchesTotalPages: (pages) => set({ watchesTotalPages: pages }),
  fetchFavoritesPagination: async () => {
    try {
      const response = await favoritesApi.getFavoritesLength();
      set({ favoritesTotalPages: response.pages || 1 });
    } catch (error) {
      console.error("Error fetching favorites pagination:", error);
      set({ favoritesTotalPages: 1 });
    }
  },
  fetchWatchesPagination: async () => {
    try {
      const response = await watchesApi.getWatchesLength();
      set({ watchesTotalPages: response.pages || 1 });
    } catch (error) {
      console.error("Error fetching watches pagination:", error);
      set({ watchesTotalPages: 1 });
    }
  },
}));

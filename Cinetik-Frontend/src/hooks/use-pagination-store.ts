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
  highestRatedMoviesTotalPages: number;
  trendingMoviesTotalPages: number;
  highestRatedSeriesTotalPages: number;
  trendingSeriesTotalPages: number;
  trendingTotalPages: number;
  searchTotalPages: number;
  filteredTotalPages: number;
  filteredBothTotalPages: number;
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
  setHighestRatedMoviesTotalPages: (pages: number) => void;
  setTrendingMoviesTotalPages: (pages: number) => void;
  setHighestRatedSeriesTotalPages: (pages: number) => void;
  setTrendingSeriesTotalPages: (pages: number) => void;
  setTrendingTotalPages: (pages: number) => void;
  setSearchTotalPages: (pages: number) => void;
  setFilteredTotalPages: (pages: number) => void;
  setFilteredBothTotalPages: (pages: number) => void;
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
  highestRatedMoviesTotalPages: 500,
  trendingMoviesTotalPages: 500,
  highestRatedSeriesTotalPages: 500,
  trendingSeriesTotalPages: 500,
  trendingTotalPages: 500,
  searchTotalPages: 500,
  filteredTotalPages: 500,
  filteredBothTotalPages: 500,
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
  setHighestRatedMoviesTotalPages: (pages) =>
    set({ highestRatedMoviesTotalPages: pages }),
  setTrendingMoviesTotalPages: (pages) =>
    set({ trendingMoviesTotalPages: pages }),
  setHighestRatedSeriesTotalPages: (pages) =>
    set({ highestRatedSeriesTotalPages: pages }),
  setTrendingSeriesTotalPages: (pages) =>
    set({ trendingSeriesTotalPages: pages }),
  setTrendingTotalPages: (pages) => set({ trendingTotalPages: pages }),
  setSearchTotalPages: (pages) => set({ searchTotalPages: pages }),
  setFilteredTotalPages: (pages) => set({ filteredTotalPages: pages }),
  setFilteredBothTotalPages: (pages) => set({ filteredBothTotalPages: pages }),
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

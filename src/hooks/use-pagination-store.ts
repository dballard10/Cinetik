import { create } from "zustand";

interface PaginationStore {
  highestRatedMoviesPage: number;
  trendingMoviesPage: number;
  highestRatedSeriesPage: number;
  trendingSeriesPage: number;
  trendingPage: number;
  searchPage: number;
  filteredPage: number;
  filteredBothPage: number;
  setHighestRatedMoviesPage: (page: number) => void;
  setHighestRatedSeriesPage: (page: number) => void;
  setTrendingMoviesPage: (page: number) => void;
  setTrendingSeriesPage: (page: number) => void;
  setTrendingPage: (page: number) => void;
  setSearchPage: (page: number) => void;
  setFilteredPage: (page: number) => void;
  setFilteredBothPage: (page: number) => void;
}

export const usePaginationStore = create<PaginationStore>((set) => ({
  highestRatedMoviesPage: 1,
  trendingMoviesPage: 1,
  highestRatedSeriesPage: 1,
  trendingSeriesPage: 1,
  trendingPage: 1,
  searchPage: 1,
  filteredPage: 1,
  filteredBothPage: 1,
  setHighestRatedMoviesPage: (page) => set({ highestRatedMoviesPage: page }),
  setHighestRatedSeriesPage: (page) => set({ highestRatedSeriesPage: page }),
  setTrendingMoviesPage: (page) => set({ trendingMoviesPage: page }),
  setTrendingSeriesPage: (page) => set({ trendingSeriesPage: page }),
  setTrendingPage: (page) => set({ trendingPage: page }),
  setSearchPage: (page) => set({ searchPage: page }),
  setFilteredPage: (page) => set({ filteredPage: page }),
  setFilteredBothPage: (page) => set({ filteredBothPage: page }),
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MediaState {
  selectedShow: {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    media_type: "tv" | "movie";
    release_date: string;
    runtime: number;
    genres: { id: number; name: string }[];
    production_companies: { id: number; name: string }[];
    production_countries: { iso_3166_1: string; name: string }[];
    spoken_languages: { iso_639_1: string; name: string }[];
  };
  selectedGenres: {
    movieIds: number[];
    tvIds: number[];
    names: string[];
  };
  selectedPlatforms: {
    platformIds: number[];
    platformNames: string[];
  };
  selectedSort: {
    id_asc: string;
    id_desc: string;
    name: string;
  };
  searchQuery: string;
  setSelectedShow: (show: MediaState["selectedShow"]) => void;
  clearSelectedShow: () => void;
  addSelectedGenre: (movieId: number, tvId: number, name: string) => void;
  removeSelectedGenre: (movieId: number, tvId: number, name: string) => void;
  clearSelectedGenres: () => void;
  addSelectedPlatform: (platform: number, name: string) => void;
  removeSelectedPlatform: (platform: number, name: string) => void;
  clearSelectedPlatforms: () => void;
  addSelectedSort: (id_asc: string, id_desc: string, name: string) => void;
  removeSelectedSort: (id_asc: string, id_desc: string, name: string) => void;
  clearSelectedSort: () => void;
  setSearchQuery: (query: string) => void;
  clearSearchQuery: () => void;
}

const useMediaStore = create<MediaState>()(
  persist(
    (set) => ({
      selectedShow: {
        id: 0,
        name: "",
        overview: "",
        poster_path: "",
        backdrop_path: "",
        vote_average: 0,
        vote_count: 0,
        media_type: "tv",
        release_date: "",
        runtime: 0,
        genres: [],
        production_companies: [],
        production_countries: [],
        spoken_languages: [],
      },
      selectedGenres: {
        movieIds: [],
        tvIds: [],
        names: [],
      },
      selectedPlatforms: {
        platformIds: [],
        platformNames: [],
      },
      selectedSort: {
        id_asc: "",
        id_desc: "",
        name: "",
      },
      searchQuery: "",
      setSelectedShow: (show) => set({ selectedShow: show }),
      clearSelectedShow: () =>
        set({
          selectedShow: {
            id: 0,
            name: "",
            overview: "",
            poster_path: "",
            backdrop_path: "",
            vote_average: 0,
            vote_count: 0,
            media_type: "tv",
            release_date: "",
            runtime: 0,
            genres: [],
            production_companies: [],
            production_countries: [],
            spoken_languages: [],
          },
        }),
      addSelectedGenre: (movieId, tvId, name) =>
        set((state) => ({
          selectedGenres: {
            ...state.selectedGenres,
            movieIds:
              movieId && movieId > 0
                ? [...state.selectedGenres.movieIds, movieId]
                : state.selectedGenres.movieIds,
            tvIds:
              tvId && tvId > 0
                ? [...state.selectedGenres.tvIds, tvId]
                : state.selectedGenres.tvIds,
            names: [...state.selectedGenres.names, name],
          },
        })),
      removeSelectedGenre: (movieId, tvId, name) =>
        set((state) => ({
          selectedGenres: {
            ...state.selectedGenres,
            movieIds: state.selectedGenres.movieIds.filter(
              (id) => id !== movieId
            ),
            tvIds: state.selectedGenres.tvIds.filter((id) => id !== tvId),
            names: state.selectedGenres.names.filter(
              (genreName) => genreName !== name
            ),
          },
        })),
      clearSelectedGenres: () =>
        set({
          selectedGenres: { movieIds: [], tvIds: [], names: [] },
        }),
      addSelectedPlatform: (platform, name) =>
        set((state) => ({
          selectedPlatforms: {
            ...state.selectedPlatforms,
            platformIds: [...state.selectedPlatforms.platformIds, platform],
            platformNames: [...state.selectedPlatforms.platformNames, name],
          },
        })),
      removeSelectedPlatform: (platform) =>
        set((state) => ({
          selectedPlatforms: {
            ...state.selectedPlatforms,
            platformIds: state.selectedPlatforms.platformIds.filter(
              (p) => p !== platform
            ),
          },
        })),
      clearSelectedPlatforms: () =>
        set({
          selectedPlatforms: { platformIds: [], platformNames: [] },
        }),
      addSelectedSort: (id_asc, id_desc, name) =>
        set((state) => ({
          selectedSort: { ...state.selectedSort, id_asc, id_desc, name },
        })),
      removeSelectedSort: (id_asc, id_desc, name) =>
        set((state) => ({
          selectedSort: {
            ...state.selectedSort,
            id_asc: state.selectedSort.id_asc !== id_asc ? id_asc : "",
            id_desc: state.selectedSort.id_desc !== id_desc ? id_desc : "",
            name: state.selectedSort.name !== name ? name : "",
          },
        })),
      clearSelectedSort: () =>
        set({
          selectedSort: { id_asc: "", id_desc: "", name: "" },
        }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      clearSearchQuery: () => set({ searchQuery: "" }),
    }),
    {
      name: "media-store",
      partialize: (state) => ({
        selectedShow: state.selectedShow,
      }),
    }
  )
);

export default useMediaStore;

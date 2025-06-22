import { Media } from "@/entities/media";
import axios from "axios";
import { usePaginationStore } from "../use-pagination-store";
import { useEnhancedMedia } from "../use-enhanced-media";

const useTrendingMovies = () => {
  const { trendingMoviesPage } = usePaginationStore();

  const options = {
    method: "GET",
    url: `${
      import.meta.env.VITE_TMDB_BASE_URL
    }/trending/movie/day?language=en-US&page=${trendingMoviesPage}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  const basicDataFetcher = async (): Promise<Media[]> => {
    const response = await axios.request(options);

    if (response && response.data.results) {
      const mediaItems = response.data.results.map(
        (item: any): Media => ({
          id: item.id,
          name: item.name || item.title,
          backdrop_path: item.backdrop_path,
          vote_average: item.vote_average,
          media_type: "movie",
          isFavorite: false,
          isWatched: false,
        })
      );
      return mediaItems;
    }

    throw new Error("Invalid response from API");
  };

  return useEnhancedMedia({
    queryKey: ["trending-movies", trendingMoviesPage],
    basicDataFetcher,
  });
};

export default useTrendingMovies;

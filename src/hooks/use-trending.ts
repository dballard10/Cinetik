import { Media } from "@/entities/media";
import axios from "axios";
import { usePaginationStore } from "./use-pagination-store";
import { useEnhancedMedia } from "./use-enhanced-media";

const useTrending = () => {
  const { trendingPage, setTrendingTotalPages } = usePaginationStore();

  const options = {
    method: "GET",
    url: `${
      import.meta.env.VITE_TMDB_BASE_URL
    }/trending/all/day?language=en-US&page=${trendingPage}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  const basicDataFetcher = async (): Promise<Media[]> => {
    const response = await axios.request(options);

    if (response && response.data.results) {
      if (response.data.total_pages) {
        setTrendingTotalPages(Math.min(response.data.total_pages, 500));
      }

      const mediaItems = response.data.results.map(
        (item: any): Media => ({
          id: item.id,
          name: item.name || item.title,
          backdrop_path: item.backdrop_path,
          vote_average: item.vote_average,
          vote_count: item.vote_count,
          media_type: item.media_type,
          isFavorite: false,
          isWatched: false,
        })
      );
      return mediaItems;
    }

    throw new Error("Invalid response from API");
  };

  return useEnhancedMedia({
    queryKey: ["trending", trendingPage],
    basicDataFetcher,
  });
};

export default useTrending;

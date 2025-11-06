import { Media } from "@/entities/media";
import axios from "axios";
import { usePaginationStore } from "./use-pagination-store";
import { useEnhancedMedia } from "./use-enhanced-media";

const useSearchMedia = (query: string, media_type: string) => {
  const { searchPage, setSearchTotalPages } = usePaginationStore();

  const options = {
    method: "GET",
    url: `${
      import.meta.env.VITE_TMDB_BASE_URL
    }/search/${media_type}?query=${query}&include_adult=false&language=en-US&page=${searchPage}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  const basicDataFetcher = async (): Promise<Media[]> => {
    const response = await axios.request(options);

    if (response && response.data.results) {
      if (response.data.total_pages) {
        setSearchTotalPages(Math.min(response.data.total_pages, 500));
      }

      const mediaItems = response.data.results.map(
        (item: any): Media => ({
          id: item.id,
          name: item.title || item.name,
          backdrop_path: item.backdrop_path,
          vote_average: item.vote_average,
          vote_count: item.vote_count,
          media_type: media_type,
          isFavorite: false,
          isWatched: false,
        })
      );

      mediaItems.sort((a, b) => b.vote_count - a.vote_count);
      return mediaItems;
    }

    throw new Error("Invalid response from API");
  };

  return useEnhancedMedia({
    queryKey: ["search-media", query, media_type, searchPage],
    basicDataFetcher,
  });
};

export default useSearchMedia;

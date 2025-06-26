import { Media } from "@/entities/media";
import axios from "axios";
import { usePaginationStore } from "./use-pagination-store";
import { useEnhancedMedia } from "./use-enhanced-media";

const useFilteredMedia = (
  genre_list: string,
  platform_list: string,
  sort_by: string,
  media_type: string
) => {
  const { filteredPage, setFilteredTotalPages } = usePaginationStore();

  const sort_by_query = `sort_by=${sort_by}`;
  const genre_query = `with_genres=${genre_list}`;
  const platform_query = `with_watch_providers=${platform_list}&watch_region=US`;

  const query =
    (sort_by ? "&" + sort_by_query : "") +
    (genre_list ? "&" + genre_query : "") +
    (platform_list ? "&" + platform_query : "");

  const options = {
    method: "GET",
    url: `${
      import.meta.env.VITE_TMDB_BASE_URL
    }/discover/${media_type}?include_adult=false&include_video=false&language=en-US&page=${filteredPage}${query}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  const basicDataFetcher = async (): Promise<Media[]> => {
    const response = await axios.request(options);

    if (response && response.data.results) {
      if (response.data.total_pages) {
        setFilteredTotalPages(Math.min(response.data.total_pages, 500));
      }

      const mediaItems = response.data.results.map(
        (item: any): Media => ({
          id: item.id,
          name: item.title || item.name,
          backdrop_path: item.backdrop_path,
          vote_count: item.vote_count,
          vote_average: item.vote_average,
          media_type: media_type,
          isFavorite: false,
          isWatched: false,
        })
      );
      return mediaItems;
    }

    throw new Error("Invalid response from API");
  };

  return useEnhancedMedia({
    queryKey: [
      "filtered-media",
      genre_list,
      platform_list,
      sort_by,
      filteredPage,
    ],
    basicDataFetcher,
  });
};

export default useFilteredMedia;

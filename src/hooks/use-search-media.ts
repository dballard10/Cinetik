import { Media } from "@/entities/media";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { favoritesApi, watchesApi } from "@/services/api-client";

const useSearchMedia = (query: string, media_type: string) => {
  const options = {
    method: "GET",
    url: `${
      import.meta.env.VITE_TMDB_BASE_URL
    }/search/${media_type}?query=${query}&include_adult=false&language=en-US&page=1`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  return useQuery({
    queryKey: ["search-media", query, media_type],
    queryFn: async () => {
      const response = await axios.request(options);

      if (response && response.data.results) {
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

        // Check for both favorites and watched status
        const favoritesResults = await favoritesApi.findAllFavorites(
          mediaItems
        );
        const results = await watchesApi.findAllWatches(favoritesResults);
        return results;
      }

      throw new Error("Invalid response from API");
    },
  });
};

export default useSearchMedia;

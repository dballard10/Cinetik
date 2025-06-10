import { Media } from "@/entities/media";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { favoritesApi, watchesApi } from "@/services/api-client";
import useMediaStore from "./use-media-store";

const useTrending = () => {
  const { currentPage } = useMediaStore();

  const options = {
    method: "GET",
    url: `${
      import.meta.env.VITE_TMDB_BASE_URL
    }/trending/all/day?language=en-US&page=${currentPage}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  console.log("🔥 useTrending: URL:", options.url);
  console.log("🔥 useTrending: Current Page:", currentPage);

  return useQuery({
    queryKey: ["trending", currentPage],
    queryFn: async () => {
      const response = await axios.request(options);

      if (response && response.data.results) {
        const mediaItems = response.data.results.map(
          (item: any): Media => ({
            id: item.id,
            name: item.name || item.title,
            backdrop_path: item.backdrop_path,
            vote_average: item.vote_average,
            media_type: item.media_type,
            isFavorite: false,
            isWatched: false,
          })
        );

        const favoritesResults = await favoritesApi.findAllFavorites(
          mediaItems
        );
        const results = await watchesApi.findAllWatches(favoritesResults);
        console.log("Results: ", results);
        return results;
      }

      throw new Error("Invalid response from API");
    },
  });
};

export default useTrending;

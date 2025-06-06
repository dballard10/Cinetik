import { MediaDetails } from "@/entities/media";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMediaDetails = (id: number, media_type: string) => {
  if (!id || !media_type) {
    throw new Error("Invalid parameters: id and media_type are required");
  }

  const options = {
    method: "GET",
    url: `${
      import.meta.env.VITE_TMDB_BASE_URL
    }/${media_type}/${id}?language=en-US`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  return useQuery({
    queryKey: ["media-details", id, media_type],
    queryFn: async () => {
      const response = await axios.request(options);

      if (response && response.data) {
        const item = response.data;
        return {
          id: item.id,
          name: item.name || item.title,
          overview: item.overview,
          poster_path: item.poster_path,
          backdrop_path: item.backdrop_path,
          vote_average: item.vote_average,
          media_type: media_type,
          release_date: item.release_date || item.first_air_date,
          isFavorite: false,
          isWatched: false,
          runtime: item.runtime || item.episode_run_time?.[0],
          genres: item.genres,
          production_companies: item.production_companies,
          production_countries: item.production_countries,
          spoken_languages: item.spoken_languages,
        } as MediaDetails;
      }

      throw new Error("Invalid response from API");
    },
  });
};

export default useMediaDetails;

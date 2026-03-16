import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

interface VideosResponse {
  id: number;
  results: VideoResult[];
}

const useVideos = (id: number | undefined, media_type: string | undefined) => {
  const options = {
    method: "GET",
    url:
      id && media_type
        ? `${
            import.meta.env.VITE_TMDB_BASE_URL
          }/${media_type}/${id}/videos?language=en`
        : "",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  return useQuery<{ data: VideosResponse }>({
    queryKey: ["videos", id, media_type],
    queryFn: async () => {
      const response = await axios.request(options);
      return response;
    },
    enabled: !!id && !!media_type, // Only run query when id and media_type are available
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1, // Only retry once on failure
  });
};

export default useVideos;

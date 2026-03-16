import { Media } from "@/entities/media";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useImages = (id: number, media_type: string) => {
  const options = {
    method: "GET",
    url: `${
      import.meta.env.VITE_TMDB_BASE_URL
    }/${media_type}/${id}/images?language=en`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  return useQuery({
    queryKey: ["images", id, media_type],
    queryFn: () => {
      return axios.request(options);
    },
  });
};

export default useImages;

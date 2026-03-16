import { useQuery } from "@tanstack/react-query";
import { Media } from "@/entities/media";

interface UseEnhancedMediaOptions {
  queryKey: any[];
  basicDataFetcher: () => Promise<Media[]>;
  enabled?: boolean;
}

export const useEnhancedMedia = ({
  queryKey,
  basicDataFetcher,
  enabled = true,
}: UseEnhancedMediaOptions) => {
  const basicQuery = useQuery({
    queryKey,
    queryFn: basicDataFetcher,
    enabled,
  });

  return {
    data: basicQuery.data ?? [],
    isLoading: basicQuery.isLoading,
    error: basicQuery.error,
  };
};

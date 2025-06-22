import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Media } from "@/entities/media";
import { MediaEnhancementService } from "@/services/media-enhancement";

interface UseEnhancedMediaOptions {
  queryKey: (string | number | boolean)[];
  basicDataFetcher: () => Promise<Media[]>;
  enabled?: boolean;
}

export const useEnhancedMedia = ({
  queryKey,
  basicDataFetcher,
  enabled = true,
}: UseEnhancedMediaOptions) => {
  const [enhancedData, setEnhancedData] = useState<Media[]>([]);

  // Phase 1: Get basic media data
  const basicQuery = useQuery({
    queryKey: [...queryKey, "basic"],
    queryFn: basicDataFetcher,
    enabled,
  });

  // Phase 2: Get favorites status
  const favoritesQuery = useQuery({
    queryKey: [...queryKey, "favorites", basicQuery.data?.length],
    queryFn: async () => {
      if (!basicQuery.data) return [];
      return MediaEnhancementService.enhanceWithFavorites(basicQuery.data);
    },
    enabled: !!basicQuery.data && basicQuery.data.length > 0,
  });

  // Phase 3: Get watched status
  const watchedQuery = useQuery({
    queryKey: [...queryKey, "watched", favoritesQuery.data?.length],
    queryFn: async () => {
      if (!favoritesQuery.data) return [];
      return MediaEnhancementService.enhanceWithWatched(favoritesQuery.data);
    },
    enabled: !!favoritesQuery.data && favoritesQuery.data.length > 0,
  });

  // Update enhanced data progressively as each phase completes
  useEffect(() => {
    if (watchedQuery.data) {
      // Phase 3 complete: Show data with both favorites and watched status
      setEnhancedData(watchedQuery.data);
    } else if (favoritesQuery.data) {
      // Phase 2 complete: Show data with favorites status
      setEnhancedData(favoritesQuery.data);
    } else if (basicQuery.data) {
      // Phase 1 complete: Show basic data
      setEnhancedData(basicQuery.data);
    }
  }, [basicQuery.data, favoritesQuery.data, watchedQuery.data]);

  return {
    data: enhancedData,
    isLoading: basicQuery.isLoading,
    error: basicQuery.error || favoritesQuery.error || watchedQuery.error,
    // Detailed loading states for each phase
    isBasicDataLoaded: !!basicQuery.data,
    isFavoritesLoaded: !!favoritesQuery.data,
    isWatchedLoaded: !!watchedQuery.data,
    isFavoritesLoading: favoritesQuery.isLoading,
    isWatchedLoading: watchedQuery.isLoading,
  };
};

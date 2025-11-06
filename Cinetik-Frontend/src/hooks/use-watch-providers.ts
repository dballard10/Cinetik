import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { platforms } from "@/data/platforms";
import { WatchProvider } from "@/entities/watch-providers";

const useWatchProviders = (id: number, media_type: string) => {
  const options = {
    method: "GET",
    url: `${
      import.meta.env.VITE_TMDB_BASE_URL
    }/${media_type}/${id}/watch/providers`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  return useQuery({
    queryKey: ["watch-providers", id, media_type],
    queryFn: async () => {
      const response = await axios.request(options);

      // Check if we have US providers and return only those
      if (response?.data?.results?.US) {
        const usProviders = response.data.results.US;

        // Collect all US provider types (flatrate, ads, free, buy)
        const allProviders = [];

        // Add providers from each type if they exist
        if (usProviders.flatrate) allProviders.push(...usProviders.flatrate);
        if (usProviders.ads) allProviders.push(...usProviders.ads);
        if (usProviders.free) allProviders.push(...usProviders.free);
        if (usProviders.buy) allProviders.push(...usProviders.buy);
        if (usProviders.rent) allProviders.push(...usProviders.rent);

        // Map to WatchProvider type
        const mappedProviders = allProviders.map(
          (item): WatchProvider => ({
            id: item.provider_id,
            logo_path: item.logo_path,
            provider_name: item.provider_name,
            display_priority: item.display_priority,
          })
        );

        // Remove duplicate providers by ID
        const uniqueProviders = Array.from(
          new Map(
            mappedProviders.map((provider) => [provider.id, provider])
          ).values()
        );

        // Get the list of supported platform IDs from platforms.ts
        const supportedPlatformIds = platforms.map((p) => p.provider_id);

        // Filter to only return providers that match our supported platforms
        return uniqueProviders.filter((provider) =>
          supportedPlatformIds.includes(provider.id)
        );
      }

      // Return empty array if no US providers found
      return [];
    },
  });
};

export default useWatchProviders;

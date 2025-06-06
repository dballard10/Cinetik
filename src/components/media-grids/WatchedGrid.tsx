import { watchesApi, favoritesApi } from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import CardSkeletons from "../skeletons/CardSkeletons";
import CardGrid from "../card-components/CardGrid";

const WatchedGrid = () => {
  const {
    data: watched,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["watched"],
    queryFn: async () => {
      const watchedData = await watchesApi.getWatches();

      if (watchedData?.watches) {
        // Transform watched data to extract the media objects and ensure isWatched is true
        const watchedItems = watchedData.watches.map((item) => ({
          ...item.media,
          isWatched: true, // These are all watched items, so set to true
          isFavorite: false, // Initialize as false, will be updated if favorited
        }));

        // Check if any of these watched items are also favorites
        const results = await favoritesApi.findAllFavorites(watchedItems);
        return results;
      }

      return [];
    },
  });

  if (isLoading) {
    return <CardSkeletons />;
  }

  if (error) {
    console.log("👁️ WatchedGrid: Error fetching watched movies:", error);
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div>
      <CardGrid media={watched || []} />
    </div>
  );
};

export default WatchedGrid;

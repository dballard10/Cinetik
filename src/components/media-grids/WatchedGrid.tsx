import { watchesApi, favoritesApi } from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import CardSkeletons from "../skeletons/CardSkeletons";
import CardGrid from "../card-components/CardGrid";
import { usePaginationStore } from "@/hooks/use-pagination-store";

const WatchedGrid = () => {
  const { watchesPage } = usePaginationStore();

  const {
    data: watched,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["watched", watchesPage],
    queryFn: async () => {
      console.log(`🔍 Fetching watches for page: ${watchesPage}`);
      const watchedData = await watchesApi.getWatches(watchesPage);
      console.log("📄 Raw watches data:", watchedData);

      if (watchedData?.watches) {
        console.log(
          `📊 Found ${watchedData.watches.length} watches on page ${watchesPage}`
        );

        // Transform watched data to extract the media objects and ensure isWatched is true
        const watchedItems = watchedData.watches.map((item) => ({
          ...item.media,
          isWatched: true, // These are all watched items, so set to true
          isFavorite: false, // Initialize as false, will be updated if favorited
        }));

        // Check if any of these watched items are also favorites
        const results = await favoritesApi.findAllFavorites(watchedItems);
        console.log(
          `✅ Final processed watches for page ${watchesPage}:`,
          results
        );
        return results;
      }

      return [];
    },
  });

  if (isLoading) {
    return <CardSkeletons />;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div>
      <CardGrid media={watched || []} />
    </div>
  );
};

export default WatchedGrid;

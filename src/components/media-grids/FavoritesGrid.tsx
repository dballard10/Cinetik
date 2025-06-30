import { favoritesApi, watchesApi } from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import CardSkeletons from "../skeletons/CardSkeletons";
import CardGrid from "../card-components/CardGrid";
import { usePaginationStore } from "@/hooks/use-pagination-store";
import useMediaStore from "@/hooks/use-media-store";
import { useEffect } from "react";

const FavoritesGrid = () => {
  const { favoritesPage } = usePaginationStore();
  const { setFavoriteStatus, setWatchedStatus } = useMediaStore();

  const {
    data: favorites,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites", favoritesPage],
    queryFn: async () => {
      console.log(`🔍 Fetching favorites for page: ${favoritesPage}`);
      const favoritesData = await favoritesApi.getFavorites(favoritesPage);
      console.log("📄 Raw favorites data:", favoritesData);

      if (favoritesData?.favorites) {
        console.log(
          `📊 Found ${favoritesData.favorites.length} favorites on page ${favoritesPage}`
        );

        // Transform favorites data to extract the media objects and ensure isFavorite is true
        const favoriteItems = favoritesData.favorites.map((item) => ({
          ...item.media,
          isFavorite: true, // These are all favorites, so set to true
          isWatched: false, // Initialize as false, will be updated if watched
        }));

        // Check if any of these favorites are also watched
        const results = await watchesApi.findAllWatches(favoriteItems);
        console.log(
          `✅ Final processed favorites for page ${favoritesPage}:`,
          results
        );
        return results;
      }

      return [];
    },
  });

  // Sync the loaded data with centralized state
  useEffect(() => {
    if (favorites && favorites.length > 0) {
      favorites.forEach((item) => {
        setFavoriteStatus(item.id, item.isFavorite);
        setWatchedStatus(item.id, item.isWatched);
      });
    }
  }, [favorites, setFavoriteStatus, setWatchedStatus]);

  if (isLoading) {
    return <CardSkeletons />;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div>
      <CardGrid media={favorites || []} />
    </div>
  );
};

export default FavoritesGrid;

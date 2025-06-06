import { favoritesApi, watchesApi } from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import CardSkeletons from "../skeletons/CardSkeletons";
import CardGrid from "../card-components/CardGrid";

const FavoritesGrid = () => {
  const {
    data: favorites,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const favoritesData = await favoritesApi.getFavorites();

      if (favoritesData?.favorites) {
        // Transform favorites data to extract the media objects and ensure isFavorite is true
        const favoriteItems = favoritesData.favorites.map((item) => ({
          ...item.media,
          isFavorite: true, // These are all favorites, so set to true
          isWatched: false, // Initialize as false, will be updated if watched
        }));

        // Check if any of these favorites are also watched
        const results = await watchesApi.findAllWatches(favoriteItems);
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
      <CardGrid media={favorites || []} />
    </div>
  );
};

export default FavoritesGrid;

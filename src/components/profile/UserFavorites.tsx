import { Media } from "@/entities/media";
import { favoritesApi, watchesApi } from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import UserFavoritesCard from "./UserFavoritesCard";
import useMediaStore from "@/hooks/use-media-store";
import { useEffect } from "react";

const UserFavorites = () => {
  const { setFavoriteStatus, setWatchedStatus } = useMediaStore();

  const {
    data: favorites,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-favorites"],
    queryFn: async () => {
      const favoritesData = await favoritesApi.getFavorites(1);

      if (favoritesData?.favorites) {
        // Transform favorites data to extract the media objects and ensure isFavorite is true
        const favoriteItems = favoritesData.favorites.map((item: any) => ({
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

  // Sync the loaded data with centralized state
  useEffect(() => {
    if (favorites && favorites.length > 0) {
      favorites.forEach((item: Media) => {
        setFavoriteStatus(item.id, item.isFavorite);
        setWatchedStatus(item.id, item.isWatched);
      });
    }
  }, [favorites, setFavoriteStatus, setWatchedStatus]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex bg-gray-700/30 rounded-lg overflow-hidden animate-pulse"
          >
            <div className="w-1/3 bg-gray-600"></div>
            <div className="w-2/3 p-3">
              <div className="h-4 bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-600 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-400">
        <p>Error loading favorites: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <>
      {favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favorites.slice(0, 4).map((show: Media) => (
            <UserFavoritesCard
              key={show.id}
              id={show.id}
              name={show.name}
              backdrop_path={show.backdrop_path}
              media_type={show.media_type}
              isFavorite={true}
              isWatched={false}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p>You haven't added any favorites yet.</p>
          <p className="mt-2">Explore shows and mark them as favorites!</p>
        </div>
      )}
    </>
  );
};

export default UserFavorites;

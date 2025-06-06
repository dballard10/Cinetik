import { Media } from "@/entities/media";
import FavoritesButton from "../card-components/FavoritesButton";
import { Link } from "react-router-dom";
import defaultImage from "@/assets/cinetik-logo.webp";
import { favoritesApi, watchesApi } from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const UserFavorites = () => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const {
    data: favorites,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-favorites"],
    queryFn: async () => {
      const favoritesData = await favoritesApi.getFavorites();

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
            <div
              key={show.id}
              className="flex bg-gray-700/30 rounded-lg overflow-hidden hover:bg-gray-700/50 transition-colors"
            >
              <div className="w-1/3">
                <Link to={`/media/${show.id}`}>
                  <img
                    src={
                      show.backdrop_path
                        ? `${IMAGE_BASE_URL}${show.backdrop_path}`
                        : defaultImage
                    }
                    alt={show.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>
              <div className="w-2/3 p-3 flex flex-col justify-between">
                <div>
                  <Link
                    to={`/media/${show.id}`}
                    className="hover:text-purple-400 transition-colors"
                  >
                    <h4 className="font-semibold line-clamp-1">{show.name}</h4>
                  </Link>
                  {show.media_type && (
                    <p className="text-xs text-gray-400 mt-1 capitalize">
                      {show.media_type === "tv" ? "TV Show" : "Movie"}
                    </p>
                  )}
                </div>
                <div className="flex justify-end">
                  <FavoritesButton media={show} />
                </div>
              </div>
            </div>
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

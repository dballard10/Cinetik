import { TbStar, TbStarFilled } from "react-icons/tb";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Media } from "@/entities/media";
import { favoritesApi, watchesApi } from "@/services/api-client";
import { useState } from "react";
import { usePaginationStore } from "@/hooks/use-pagination-store";

interface FavoritesButtonProps {
  media: Media;
}

const FavoritesButton = ({ media }: FavoritesButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchFavoritesPagination, fetchWatchesPagination } =
    usePaginationStore();

  if (!media) {
    return null;
  }

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const newFavoriteStatus = !media.isFavorite;

      if (newFavoriteStatus) {
        // Adding to favorites
        await favoritesApi.addFavorite(media);

        // If item is currently watched, remove it from watched (mutually exclusive)
        if (media.isWatched) {
          await watchesApi.removeWatch(media.id);
          media.isWatched = false;
        }
      } else {
        // Removing from favorites
        await favoritesApi.removeFavorite(media.id);
      }

      media.isFavorite = newFavoriteStatus;

      // Refresh pagination info after the operation
      await fetchFavoritesPagination();
      await fetchWatchesPagination();
    } catch (error) {
      console.error("Error updating favorite status:", error); // TODO: Add toast notification
    } finally {
      setIsLoading(false);
    }
  };

  const buttonTitle = media.isFavorite
    ? "Remove from favorites"
    : "Add to favorites";

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      disabled={isLoading}
      title={buttonTitle}
      className={cn(
        "relative transition-all duration-300 p-3 rounded-full",
        "hover:bg-purple-500/20",
        "group",
        isLoading && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Black outline star - positioned behind */}
      {/* <TbStarFilled className="absolute w-7 h-7 text-black transition-all duration-300 -translate-x-0.5 -translate-y-0.5 opacity-20" /> */}

      {/* Main star - positioned on top */}
      {media.isFavorite ? (
        <TbStarFilled className="relative w-6 h-6 text-purple-400 transition-all duration-300" />
      ) : (
        <TbStar className="relative w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-all duration-300" />
      )}
    </motion.button>
  );
};

export default FavoritesButton;

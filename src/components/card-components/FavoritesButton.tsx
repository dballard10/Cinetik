import { TbStar, TbStarFilled } from "react-icons/tb";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Media } from "@/entities/media";
import { favoritesApi } from "@/services/api-client";
import { useState } from "react";

interface FavoritesButtonProps {
  media: Media;
}

const FavoritesButton = ({ media }: FavoritesButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  console.log(
    "⭐ Title: ",
    media?.name,
    "| ID: ",
    media?.id,
    "| Is Favorite: ",
    media?.isFavorite
  );

  if (!media) {
    console.log("⭐ FavoritesButton: No media provided - returning null");
    return null;
  }

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const newFavoriteStatus = !media.isFavorite;

      console.log(
        "⭐ Favorites Button Clicked: New favorite status:",
        newFavoriteStatus
      );

      if (newFavoriteStatus) {
        // Adding to favorites
        await favoritesApi.addFavorite(media);
      } else {
        // Removing from favorites
        await favoritesApi.removeFavorite(media.id);
      }

      // Update the media object after successful API call
      media.isFavorite = newFavoriteStatus;
    } catch (error) {
      console.error("Error updating favorite status:", error);
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
        "transition-all duration-300 p-3 rounded-full",
        "hover:bg-purple-500/20",
        "group",
        isLoading && "opacity-50 cursor-not-allowed"
      )}
    >
      {media.isFavorite ? (
        <TbStarFilled className="w-6 h-6 text-purple-400 transition-all duration-300" />
      ) : (
        <TbStar className="w-6 h-6 text-gray-700 group-hover:text-purple-400 transition-all duration-300" />
      )}
    </motion.button>
  );
};

export default FavoritesButton;

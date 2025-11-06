import { useState } from "react";
import { TbEyePlus, TbEyeFilled } from "react-icons/tb";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Media } from "@/entities/media";
import { watchesApi, favoritesApi } from "@/services/api-client";
import { usePaginationStore } from "@/hooks/use-pagination-store";
import useMediaStore from "@/hooks/use-media-store";

interface WatchedButtonProps {
  media: Media;
}

const WatchedButton = ({ media }: WatchedButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchWatchesPagination, fetchFavoritesPagination } =
    usePaginationStore();
  const {
    getWatchedStatus,
    setWatchedStatus,
    getFavoriteStatus,
    setFavoriteStatus,
  } = useMediaStore();

  if (!media) {
    return null;
  }

  // Get the current watched status from centralized state
  const isWatched = getWatchedStatus(media.id);

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const newWatchStatus = !isWatched;

      if (newWatchStatus) {
        // Adding to watched
        await watchesApi.addWatch(media);

        // If item is currently favorited, remove it from favorites (mutually exclusive)
        const isCurrentlyFavorited = getFavoriteStatus(media.id);
        if (isCurrentlyFavorited) {
          await favoritesApi.removeFavorite(media.id);
          setFavoriteStatus(media.id, false);
        }
      } else {
        // Removing from watched
        await watchesApi.removeWatch(media.id);
      }

      // Update centralized state
      setWatchedStatus(media.id, newWatchStatus);

      // Refresh pagination info after the operation
      await fetchWatchesPagination();
      await fetchFavoritesPagination();
    } catch (error) {
      console.error("Error updating watch status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonTitle = isWatched ? "Remove from watched" : "Add to watched";

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      disabled={isLoading}
      title={buttonTitle}
      className={cn(
        "relative transition-all duration-300 p-3 rounded-full",
        "hover:bg-blue-500/20",
        "group",
        isLoading && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* <TbEyeFilled className="absolute w-7 h-7 text-black transition-all duration-300 -translate-x-0.5 -translate-y-0.5 opacity-20" /> */}
      {isWatched ? (
        <TbEyeFilled className="relative w-6 h-6 text-blue-400 transition-all duration-300" />
      ) : (
        <TbEyePlus className="relative w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-all duration-300" />
      )}
    </motion.button>
  );
};

export default WatchedButton;

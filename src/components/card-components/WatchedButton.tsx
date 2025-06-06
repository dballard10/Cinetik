import { useState } from "react";
import { TbEyePlus, TbEyeFilled } from "react-icons/tb";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Media } from "@/entities/media";
import { watchesApi } from "@/services/api-client";

interface WatchedButtonProps {
  media: Media;
}

const WatchedButton = ({ media }: WatchedButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  console.log(
    "👁️ Title: ",
    media?.name,
    "| ID: ",
    media?.id,
    "| Is Watched: ",
    media?.isWatched
  );

  if (!media) {
    console.log("👁️: No media provided - returning null");
    return null;
  }

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const newWatchStatus = !media.isWatched;

      console.log(
        "👁️ Watched Button Clicked: New watched status:",
        newWatchStatus
      );

      if (newWatchStatus) {
        // Adding to watched
        await watchesApi.addWatch(media);
      } else {
        // Removing from watched
        await watchesApi.removeWatch(media.id);
      }

      // Update the media object after successful API call
      media.isWatched = newWatchStatus;
    } catch (error) {
      console.error("Error updating watch status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonTitle = media.isWatched
    ? "Remove from watched"
    : "Add to watched";

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      disabled={isLoading}
      title={buttonTitle}
      className={cn(
        "transition-all duration-300 p-3 rounded-full",
        "hover:bg-blue-500/20",
        "group",
        isLoading && "opacity-50 cursor-not-allowed"
      )}
    >
      {media.isWatched ? (
        <TbEyeFilled className="w-6 h-6 text-blue-400 transition-all duration-300" />
      ) : (
        <TbEyePlus className="w-6 h-6 text-gray-700 group-hover:text-blue-400 transition-all duration-300" />
      )}
    </motion.button>
  );
};

export default WatchedButton;

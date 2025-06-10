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

  if (!media) {
    return null;
  }

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const newWatchStatus = !media.isWatched;

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
        "relative transition-all duration-300 p-3 rounded-full",
        "hover:bg-blue-500/20",
        "group",
        isLoading && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* <TbEyeFilled className="absolute w-7 h-7 text-black transition-all duration-300 -translate-x-0.5 -translate-y-0.5 opacity-20" /> */}
      {media.isWatched ? (
        <TbEyeFilled className="relative w-6 h-6 text-blue-400 transition-all duration-300" />
      ) : (
        <TbEyePlus className="relative w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-all duration-300" />
      )}
    </motion.button>
  );
};

export default WatchedButton;

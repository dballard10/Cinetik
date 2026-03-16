import React from "react";
import useMediaStore from "@/hooks/use-media-store";
import { X } from "lucide-react";

const ClearFilterButton = ({ filter }: { filter: string }) => {
  const { clearSelectedGenres, clearSelectedPlatforms, clearSelectedSort } =
    useMediaStore();

  const handleClick = () => {
    if (filter === "genres") {
      clearSelectedGenres();
    } else if (filter === "platforms") {
      clearSelectedPlatforms();
    } else if (filter === "sort") {
      clearSelectedSort();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-1 flex items-center justify-center hover:bg-white/20 cursor-pointer`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <X className="w-4 h-4" />
    </div>
  );
};

export default ClearFilterButton;

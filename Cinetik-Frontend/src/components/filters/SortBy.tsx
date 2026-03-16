import { useState, useEffect } from "react";
import useMediaStore from "@/hooks/use-media-store";

interface SortByProps {
  id_asc: string;
  id_desc: string;
  name: string;
}

const SortBy = ({ id_asc, id_desc, name }: SortByProps) => {
  const { selectedSort, addSelectedSort, removeSelectedSort } = useMediaStore();
  const [isSelected, setIsSelected] = useState(false);

  // Check if this sort option is currently selected
  useEffect(() => {
    setIsSelected(selectedSort.name === name);
  }, [selectedSort, name]);

  const handleClick = () => {
    if (isSelected) {
      // If already selected, deselect it
      removeSelectedSort(id_asc, id_desc, name);
    } else {
      // If not selected, select it (this will replace any existing selection)
      addSelectedSort(id_asc, id_desc, name);
    }
  };

  return (
    <div>
      <button
        className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-2 w-full
          ${isSelected ? "bg-white/30 font-medium" : ""}`}
        onClick={handleClick}
      >
        {name}
      </button>
    </div>
  );
};

export default SortBy;

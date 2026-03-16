import { useState } from "react";
import useMediaStore from "@/hooks/use-media-store";

interface PlatformProps {
  id: number;
  name: string;
}

const Platform = ({ id, name }: PlatformProps) => {
  const { addSelectedPlatform, removeSelectedPlatform } = useMediaStore();
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);

    if (isSelected) {
      removeSelectedPlatform(id, name);
    } else {
      addSelectedPlatform(id, name);
    }
  };

  return (
    <div>
      <button
        className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-2 w-full
          ${isSelected ? "bg-white/30 font-medium" : ""}`}
        onClick={() => handleClick()}
      >
        {name}
      </button>
    </div>
  );
};

export default Platform;

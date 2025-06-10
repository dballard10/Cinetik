import useMediaStore from "@/hooks/use-media-store";
import { cn } from "@/lib/utils";
import { TbChevronLeft } from "react-icons/tb";

const PrevPageButton = () => {
  const { currentPage, setCurrentPage } = useMediaStore();

  const handleClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const isDisabled = currentPage === 1;

  return (
    <button
      className={cn(
        "w-10 h-10 text-white bg-gray-700 rounded-full flex items-center justify-center",
        isDisabled && "opacity-50"
      )}
      title="Previous Page"
      onClick={handleClick}
      disabled={isDisabled}
    >
      <TbChevronLeft className="w-6 h-6" />
    </button>
  );
};

export default PrevPageButton;

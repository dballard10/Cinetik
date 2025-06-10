import useMediaStore from "@/hooks/use-media-store";
import { TbChevronRight } from "react-icons/tb";

const NextPageButton = () => {
  const { currentPage, setCurrentPage } = useMediaStore();

  const handleClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <button
      className="w-10 h-10 text-white bg-gray-700 rounded-full flex items-center justify-center"
      title="Next Page"
      onClick={handleClick}
    >
      <TbChevronRight className="w-6 h-6" />
    </button>
  );
};

export default NextPageButton;

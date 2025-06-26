import { TbChevronRight } from "react-icons/tb";
import { cn } from "@/lib/utils";

interface NextPageButtonProps {
  page: number;
  setPage: (page: number) => void;
  isDisabled?: boolean;
}

const NextPageButton = ({
  page,
  setPage,
  isDisabled = false,
}: NextPageButtonProps) => {
  const handleClick = () => {
    if (!isDisabled) {
      setPage(page + 1);
    }
  };

  return (
    <button
      className={cn(
        "w-10 h-10 text-white bg-gray-700 rounded-full flex items-center justify-center",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
      title={isDisabled ? "No more pages" : "Next Page"}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <TbChevronRight className="w-6 h-6" />
    </button>
  );
};

export default NextPageButton;

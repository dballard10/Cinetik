import { TbChevronRight } from "react-icons/tb";
import { cn } from "@/lib/utils";

interface NextPageButtonProps {
  page: number;
  setPage: (page: number) => void;
  disabled?: boolean;
}

const NextPageButton = ({
  page,
  setPage,
  disabled = false,
}: NextPageButtonProps) => {
  const handleClick = () => {
    if (!disabled) {
      setPage(page + 1);
    }
  };

  return (
    <button
      className={cn(
        "w-10 h-10 text-white bg-gray-700 rounded-full flex items-center justify-center",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      title={disabled ? "No more pages" : "Next Page"}
      onClick={handleClick}
      disabled={disabled}
    >
      <TbChevronRight className="w-6 h-6" />
    </button>
  );
};

export default NextPageButton;

import { cn } from "@/lib/utils";
import { TbChevronLeft } from "react-icons/tb";

interface PrevPageButtonProps {
  page: number;
  setPage: (page: number) => void;
}

const PrevPageButton = ({ page, setPage }: PrevPageButtonProps) => {
  const handleClick = () => {
    setPage(page - 1);
  };

  const isDisabled = page === 1;
  const buttonTitle = isDisabled ? "First Page" : "Previous Page";

  return (
    <button
      className={cn(
        "w-10 h-10 text-white bg-gray-700 rounded-full flex items-center justify-center",
        isDisabled && "opacity-50"
      )}
      title={buttonTitle}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <TbChevronLeft className="w-6 h-6" />
    </button>
  );
};

export default PrevPageButton;

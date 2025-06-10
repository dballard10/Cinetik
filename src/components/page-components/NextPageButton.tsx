import { TbChevronRight } from "react-icons/tb";

interface NextPageButtonProps {
  page: number;
  setPage: (page: number) => void;
}

const NextPageButton = ({ page, setPage }: NextPageButtonProps) => {
  const handleClick = () => {
    setPage(page + 1);
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

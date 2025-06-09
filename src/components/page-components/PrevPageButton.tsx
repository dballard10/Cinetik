import { TbChevronLeft } from "react-icons/tb";

const PrevPageButton = () => {
  const handleClick = () => {
    console.log("Previous Page");
  };

  return (
    <button
      className="w-10 h-10 text-white bg-gray-700 rounded-full flex items-center justify-center"
      title="Previous Page"
      onClick={handleClick}
    >
      <TbChevronLeft className="w-6 h-6" />
    </button>
  );
};

export default PrevPageButton;

interface MediaTitleProps {
  name: string;
}

const MediaTitle = ({ name }: MediaTitleProps) => {
  return (
    <div className="text-md font-semibold text-white cursor-pointer transition-transform hover:scale-105">
      {name}
    </div>
  );
};

export default MediaTitle;

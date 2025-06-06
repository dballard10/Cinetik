interface MediaTypeProps {
  media_type: string;
}

const MediaType = ({ media_type }: MediaTypeProps) => {
  return (
    <div className="text-sm text-gray-400 mt-1">
      {media_type === "tv" ? "Series" : "Movie"}
    </div>
  );
};

export default MediaType;

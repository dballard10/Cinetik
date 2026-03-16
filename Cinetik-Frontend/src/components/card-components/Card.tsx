import MediaTitle from "./MediaTitle";
import CardImage from "./CardImage";
import MediaType from "./MediaType";
import useMediaStore from "@/hooks/use-media-store";
import useMediaDetails from "@/hooks/media-details/use-media-details";

interface CardProps {
  id: number;
  name: string;
  backdrop_path: string;
  media_type: string;
}

const Card = ({ id, name, backdrop_path, media_type: rawMediaType }: CardProps) => {
  const { setSelectedShow } = useMediaStore();

  const media_type = ["tv", "movie"].includes(rawMediaType)
    ? (rawMediaType as "tv" | "movie")
    : "movie";

  const { data: content, isLoading, error } = useMediaDetails(id, media_type);

  const handleCardClick = () => {
    if (!isLoading && !error && content) {
      setSelectedShow(content as any);
    }
  };

  if (!id || !media_type) {
    return null;
  }

  return (
    <div className="relative group bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg hover:scale-105 transition-all duration-300 overflow-hidden">
      <CardImage
        backdrop_path={backdrop_path}
        name={name}
        id={id}
        media_type={media_type}
        handleCardClick={handleCardClick}
      />
      <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-full p-2 bg-black bg-opacity-80">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-4">
                <MediaTitle name={name} />
              </div>
              <div className="flex flex-row gap-4">
                <MediaType media_type={media_type} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

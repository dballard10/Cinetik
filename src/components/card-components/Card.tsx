import FavoritesButton from "./FavoritesButton";
import MediaTitle from "./MediaTitle";
import CardImage from "./CardImage";
import MediaType from "./MediaType";
import useMediaStore from "@/hooks/use-media-store";
import useMediaDetails from "@/hooks/media-details/use-media-details";
import WatchedButton from "./WatchedButton";
import { Media } from "@/entities/media";

interface CardProps {
  id: number;
  name: string;
  backdrop_path: string;
  media_type: string;
  isFavorite?: boolean;
  isWatched?: boolean;
}

const Card = ({
  id,
  name,
  backdrop_path,
  media_type: rawMediaType,
  isFavorite,
  isWatched,
}: CardProps) => {
  const { setSelectedShowWithStatus, getFavoriteStatus, getWatchedStatus } =
    useMediaStore();

  const media_type = ["tv", "movie"].includes(rawMediaType)
    ? (rawMediaType as "tv" | "movie")
    : "movie";

  const { data: content, isLoading, error } = useMediaDetails(id, media_type);

  const handleCardClick = () => {
    if (!isLoading && !error && content) {
      // Use the new method that applies centralized state
      setSelectedShowWithStatus(content as any);
    }
  };

  // Get current status from centralized store for the buttons
  const currentIsFavorite = getFavoriteStatus(id);
  const currentIsWatched = getWatchedStatus(id);

  // Create a proper Media object for the buttons with the correct props
  const mediaForButtons: Media = {
    id,
    name,
    backdrop_path,
    media_type,
    isFavorite: currentIsFavorite,
    isWatched: currentIsWatched,
    vote_average: content?.vote_average || 0,
    vote_count: content?.vote_count || 0,
  };

  // Don't render the card if we don't have valid id or media_type
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
      <div
        className={`absolute top-2 left-2 z-10 rounded-full transition-opacity duration-300 ${
          currentIsWatched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        } ${currentIsWatched ? "" : "group-hover:shadow"}`}
      >
        <WatchedButton media={mediaForButtons} />
      </div>
      <div
        className={`absolute top-2 right-2 z-10 rounded-full transition-opacity duration-300 ${
          currentIsFavorite
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        } ${currentIsFavorite ? "" : "group-hover:shadow"}`}
      >
        <FavoritesButton media={mediaForButtons} />
      </div>
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

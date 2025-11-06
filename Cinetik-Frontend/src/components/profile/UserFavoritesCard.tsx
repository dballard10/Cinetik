import { Link } from "react-router-dom";
import FavoritesButton from "@/components/card-components/FavoritesButton";
import MediaTitle from "@/components/card-components/MediaTitle";
import MediaType from "@/components/card-components/MediaType";
import useMediaStore from "@/hooks/use-media-store";
import useMediaDetails from "@/hooks/media-details/use-media-details";
import { Media } from "@/entities/media";
import default_image from "@/assets/cinetik-logo.webp";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface UserFavoritesCardProps {
  id: number;
  name: string;
  backdrop_path: string;
  media_type: string;
  isFavorite?: boolean;
  isWatched?: boolean;
}

const UserFavoritesCard = ({
  id,
  name,
  backdrop_path,
  media_type: rawMediaType,
  isFavorite,
  isWatched,
}: UserFavoritesCardProps) => {
  const { setSelectedShowWithStatus, getFavoriteStatus, getWatchedStatus } =
    useMediaStore();

  const media_type = ["tv", "movie"].includes(rawMediaType)
    ? (rawMediaType as "tv" | "movie")
    : "movie";

  const { data: content, isLoading, error } = useMediaDetails(id, media_type);

  const handleCardClick = () => {
    if (!isLoading && !error && content) {
      setSelectedShowWithStatus(content as any);
    }
  };

  // Get current status from centralized store
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

  // Get the full image URL like in the original CardImage component
  const fullImageUrl = !backdrop_path
    ? default_image
    : backdrop_path.startsWith("http")
    ? backdrop_path
    : `${IMAGE_BASE_URL}${backdrop_path}`;

  return (
    <div className="flex bg-gray-700/30 rounded-lg overflow-hidden hover:bg-gray-700/50 transition-colors">
      <div className="w-1/3">
        <Link
          to={`/media/${name.toLowerCase().replace(/ /g, "-")}`}
          state={{ id: id.toString(), mediaType: media_type }}
          onClick={handleCardClick}
        >
          <img
            src={fullImageUrl}
            alt="poster"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className="w-2/3 p-3 flex flex-col justify-between">
        <div>
          <Link
            to={`/media/${name.toLowerCase().replace(/ /g, "-")}`}
            state={{ id: id.toString(), mediaType: media_type }}
            onClick={handleCardClick}
          >
            <h4 className="font-semibold line-clamp-1">{name}</h4>
          </Link>
          <MediaType media_type={media_type} />
        </div>
        <div className="flex justify-end">
          <FavoritesButton media={mediaForButtons} />
        </div>
      </div>
    </div>
  );
};

export default UserFavoritesCard;

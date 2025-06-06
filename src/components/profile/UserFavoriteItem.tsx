import { Media } from "@/entities/media";
import FavoritesButton from "../card-components/FavoritesButton";
import { Link } from "react-router-dom";
import defaultImage from "@/assets/cinetik-logo.webp";

interface UserFavoriteItemProps {
  show: Media;
}

const UserFavoriteItem = ({ show }: UserFavoriteItemProps) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="flex bg-gray-700/30 rounded-lg overflow-hidden hover:bg-gray-700/50 transition-colors">
      <div className="w-1/3">
        <Link to={`/media/${show.id}`}>
          <img
            src={
              show.backdrop_path
                ? `${IMAGE_BASE_URL}${show.backdrop_path}`
                : defaultImage
            }
            alt={show.name}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className="w-2/3 p-3 flex flex-col justify-between">
        <div>
          <Link
            to={`/media/${show.id}`}
            className="hover:text-purple-400 transition-colors"
          >
            <h4 className="font-semibold line-clamp-1">{show.name}</h4>
          </Link>
          <p className="text-sm text-gray-400">
            Rating: {show.vote_average?.toFixed(1) || "N/A"}
          </p>
          {show.release_date && (
            <p className="text-xs text-gray-500">
              Released: {new Date(show.release_date).getFullYear()}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <FavoritesButton media={show} />
        </div>
      </div>
    </div>
  );
};

export default UserFavoriteItem;

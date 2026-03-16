import { Link } from "react-router-dom";
import default_image from "@/assets/cinetik-logo.webp";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface CardImageProps {
  backdrop_path: string;
  name: string;
  id: number;
  media_type: string;
  handleCardClick: () => void;
}

const CardImage = ({
  backdrop_path,
  name,
  id,
  media_type,
  handleCardClick,
}: CardImageProps) => {
  const fullImageUrl = !backdrop_path
    ? default_image
    : backdrop_path.startsWith("http")
    ? backdrop_path
    : `${IMAGE_BASE_URL}${backdrop_path}`;

  return (
    <Link
      to={`/media/${name.toLowerCase().replace(/ /g, "-")}`}
      state={{ id: id.toString(), mediaType: media_type }}
      onClick={handleCardClick}
    >
      <img
        src={fullImageUrl}
        alt="poster"
        className="w-full h-48 object-cover rounded-t-lg"
      />
    </Link>
  );
};

export default CardImage;

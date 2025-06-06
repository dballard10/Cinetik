import Card from "./Card";
import { Media } from "../../entities/media";

interface CardGridProps {
  media: Media[];
}

const CardGrid = ({ media: content }: CardGridProps) => {
  if (!content || content.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">No items to display</div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {content.map((item, index) => {
        return (
          <Card
            key={`${item.id}-${index}`}
            id={item.id}
            name={item.name}
            backdrop_path={item.backdrop_path}
            media_type={item.media_type as "tv" | "movie"}
            isFavorite={item.isFavorite}
            isWatched={item.isWatched}
          />
        );
      })}
    </div>
  );
};

export default CardGrid;

import useMediaStore from "@/hooks/use-media-store";
import CardGrid from "../card-components/CardGrid";
import { Media } from "@/entities/media";
import CardSkeletons from "../skeletons/CardSkeletons";
import useFilteredMedia from "@/hooks/use-filtered-media";

interface FilteredMediaGridProps {
  media_type: string;
}

const FilteredMediaGrid = ({ media_type }: FilteredMediaGridProps) => {
  const { selectedGenres, selectedPlatforms, selectedSort } = useMediaStore();

  const genres =
    media_type === "tv"
      ? selectedGenres.tvIds.join("|")
      : selectedGenres.movieIds.join("|");

  const {
    data: media,
    isLoading,
    error,
  } = useFilteredMedia(
    genres,
    selectedPlatforms.platformIds.join("|"),
    selectedSort.id_desc,
    media_type
  );

  if (isLoading) return <CardSkeletons />;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <CardGrid media={media as Media[]} />
    </div>
  );
};

export default FilteredMediaGrid;

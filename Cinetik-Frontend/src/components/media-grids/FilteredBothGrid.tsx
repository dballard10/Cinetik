import useMediaStore from "@/hooks/use-media-store";
import CardGrid from "../card-components/CardGrid";
import { Media } from "@/entities/media";
import CardSkeletons from "../skeletons/CardSkeletons";
import useFilteredBoth from "@/hooks/use-filtered-both";

const FilteredBothGrid = () => {
  const { selectedGenres, selectedPlatforms, selectedSort } = useMediaStore();

  const {
    data: media,
    isLoading,
    error,
  } = useFilteredBoth(
    selectedGenres.movieIds.join("|"),
    selectedGenres.tvIds.join("|"),
    selectedPlatforms.platformIds.join("|"),
    selectedSort.id_desc
  );

  if (isLoading) return <CardSkeletons />;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <CardGrid media={media as Media[]} />
    </div>
  );
};

export default FilteredBothGrid;

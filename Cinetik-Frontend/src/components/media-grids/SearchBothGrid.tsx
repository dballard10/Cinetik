import CardGrid from "../card-components/CardGrid";
import { Media } from "@/entities/media";
import CardSkeletons from "../skeletons/CardSkeletons";
import useSearchBoth from "@/hooks/use-search-both";

interface SearchBothGridProps {
  query: string;
}

const SearchBothGrid = ({ query }: SearchBothGridProps) => {
  const { data: media, isLoading, error } = useSearchBoth(query);

  if (isLoading) return <CardSkeletons />;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <CardGrid media={media as Media[]} />
    </div>
  );
};

export default SearchBothGrid;

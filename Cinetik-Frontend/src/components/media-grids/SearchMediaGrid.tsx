import CardSkeletons from "@/components/skeletons/CardSkeletons";
import CardGrid from "../card-components/CardGrid";
import { Media } from "@/entities/media";
import useSearchMedia from "@/hooks/use-search-media";

interface SearchMediaGridProps {
  query: string;
  media_type: string;
}

const SearchMediaGrid = ({ query, media_type }: SearchMediaGridProps) => {
  const { data: content, isLoading, error } = useSearchMedia(query, media_type);

  if (isLoading) return <CardSkeletons />;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <CardGrid media={content as Media[]} />
    </div>
  );
};

export default SearchMediaGrid;

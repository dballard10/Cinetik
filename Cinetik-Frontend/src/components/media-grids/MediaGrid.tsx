import CardSkeletons from "@/components/skeletons/CardSkeletons";
import CardGrid from "../card-components/CardGrid";
import { Media } from "@/entities/media";

// Define a type for the hook result
type UseMediaHookResult = {
  data: Media[] | undefined;
  isLoading: boolean;
  error: Error | null;
};

// Define props interface with optional useMediaHook
interface MediaGridProps {
  useMediaHook?: () => UseMediaHookResult;
}

const MediaGrid = ({ useMediaHook }: MediaGridProps) => {
  const { data: content, isLoading, error } = useMediaHook();

  if (isLoading) return <CardSkeletons />;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <CardGrid media={content as Media[]} />
    </div>
  );
};

export default MediaGrid;

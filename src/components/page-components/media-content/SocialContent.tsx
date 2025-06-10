import GridHeading from "@/components/media-grids/GridHeading";
import SearchBar from "@/components/filters/SearchBar";
import MediaGrid from "@/components/media-grids/MediaGrid";
import useTrendingMovies from "@/hooks/movies/use-trending-movies";

const SocialContent = () => {
  return (
    <>
      <SearchBar />
      <GridHeading
        title="What your friends are watching"
        page={1}
        setPage={() => {}}
      />
      <MediaGrid useMediaHook={useTrendingMovies} />
    </>
  );
};

export default SocialContent;

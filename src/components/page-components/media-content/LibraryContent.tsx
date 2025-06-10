import GridHeading from "@/components/media-grids/GridHeading";
import SearchBar from "@/components/filters/SearchBar";
import FavoritesGrid from "@/components/media-grids/FavoritesGrid";
import WatchedGrid from "@/components/media-grids/WatchedGrid";

const LibraryContent = () => {
  return (
    <>
      <SearchBar />
      <GridHeading title="Your Favorites" page={1} setPage={() => {}} />
      <FavoritesGrid />
      <GridHeading title="Your Watches" page={1} setPage={() => {}} />
      <WatchedGrid />
    </>
  );
};

export default LibraryContent;

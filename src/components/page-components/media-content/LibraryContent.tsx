import GridHeading from "@/components/media-grids/GridHeading";
import SearchBar from "@/components/filters/SearchBar";
import FavoritesGrid from "@/components/media-grids/FavoritesGrid";
import WatchedGrid from "@/components/media-grids/WatchedGrid";
import { usePaginationStore } from "@/hooks/use-pagination-store";

const LibraryContent = () => {
  const { favoritesPage, watchesPage, setFavoritesPage, setWatchesPage } =
    usePaginationStore();

  return (
    <>
      <SearchBar />
      <GridHeading
        title="Your Favorites"
        page={favoritesPage}
        setPage={setFavoritesPage}
      />
      <FavoritesGrid />
      <GridHeading
        title="Your Watches"
        page={watchesPage}
        setPage={setWatchesPage}
      />
      <WatchedGrid />
    </>
  );
};

export default LibraryContent;

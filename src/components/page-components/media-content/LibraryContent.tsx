import GridHeading from "@/components/media-grids/GridHeading";
import SearchBar from "@/components/filters/SearchBar";
import FavoritesGrid from "@/components/media-grids/FavoritesGrid";
import WatchedGrid from "@/components/media-grids/WatchedGrid";
import { usePaginationStore } from "@/hooks/use-pagination-store";
import { useEffect } from "react";

const LibraryContent = () => {
  const {
    favoritesPage,
    watchesPage,
    favoritesTotalPages,
    watchesTotalPages,
    setFavoritesPage,
    setWatchesPage,
    fetchFavoritesPagination,
    fetchWatchesPagination,
  } = usePaginationStore();

  // Fetch pagination info on component mount
  useEffect(() => {
    fetchFavoritesPagination();
    fetchWatchesPagination();
  }, [fetchFavoritesPagination, fetchWatchesPagination]);

  return (
    <>
      <SearchBar />
      <GridHeading
        title="Your Favorites"
        page={favoritesPage}
        setPage={setFavoritesPage}
        totalPages={favoritesTotalPages}
      />
      <FavoritesGrid />
      <GridHeading
        title="Your Watches"
        page={watchesPage}
        setPage={setWatchesPage}
        totalPages={watchesTotalPages}
      />
      <WatchedGrid />
    </>
  );
};

export default LibraryContent;

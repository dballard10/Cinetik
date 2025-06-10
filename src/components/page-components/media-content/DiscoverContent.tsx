import FilteredBothGrid from "@/components/media-grids/FilteredBothGrid";
import GridHeading from "@/components/media-grids/GridHeading";
import MediaGrid from "@/components/media-grids/MediaGrid";
import SearchBar from "@/components/filters/SearchBar";
import useTrending from "@/hooks/use-trending";
import useMediaStore from "@/hooks/use-media-store";
import SearchBothGrid from "@/components/media-grids/SearchBothGrid";
import { usePaginationStore } from "@/hooks/use-pagination-store";

const DiscoverContent = () => {
  const { selectedGenres, selectedPlatforms, selectedSort, searchQuery } =
    useMediaStore();

  const {
    trendingPage,
    filteredBothPage,
    searchPage,
    setTrendingPage,
    setFilteredBothPage,
    setSearchPage,
  } = usePaginationStore();

  const shouldShowFiltered =
    selectedGenres.movieIds.length > 0 ||
    selectedGenres.tvIds.length > 0 ||
    selectedPlatforms.platformIds.length > 0 ||
    selectedSort.id_desc !== "";

  return (
    <>
      <SearchBar />
      {searchQuery ? (
        <>
          <GridHeading
            title={`Search Results for "${searchQuery}"`}
            page={searchPage}
            setPage={setSearchPage}
          />
          <SearchBothGrid query={searchQuery} />
        </>
      ) : shouldShowFiltered ? (
        <>
          <GridHeading
            title="Movies & Series"
            page={filteredBothPage}
            setPage={setFilteredBothPage}
          />
          <FilteredBothGrid />
        </>
      ) : (
        <>
          <GridHeading
            title="Trending"
            page={trendingPage}
            setPage={setTrendingPage}
          />
          <MediaGrid useMediaHook={useTrending} />
        </>
      )}
    </>
  );
};

export default DiscoverContent;

import GridHeading from "@/components/media-grids/GridHeading";
import SearchBar from "@/components/filters/SearchBar";
import FilteredMediaGrid from "@/components/media-grids/FilteredMediaGrid";
import MediaGrid from "@/components/media-grids/MediaGrid";
import useMediaStore from "@/hooks/use-media-store";
import useTrendingSeries from "@/hooks/series/use-trending-series";
import useHighestRatedSeries from "@/hooks/series/use-highest-rated-series";
import SearchMediaGrid from "@/components/media-grids/SearchMediaGrid";
import { usePaginationStore } from "@/hooks/use-pagination-store";

const SeriesContent = () => {
  const { selectedGenres, selectedPlatforms, selectedSort, searchQuery } =
    useMediaStore();

  const {
    highestRatedSeriesPage,
    trendingSeriesPage,
    searchPage,
    filteredPage,
    setSearchPage,
    setFilteredPage,
    setHighestRatedSeriesPage,
    setTrendingSeriesPage,
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
          <SearchMediaGrid query={searchQuery} media_type="tv" />
        </>
      ) : shouldShowFiltered ? (
        <>
          <GridHeading
            title="Series"
            page={filteredPage}
            setPage={setFilteredPage}
          />
          <FilteredMediaGrid media_type="tv" />
        </>
      ) : (
        <>
          <GridHeading
            title="Trending Series"
            page={trendingSeriesPage}
            setPage={setTrendingSeriesPage}
          />
          <MediaGrid useMediaHook={useTrendingSeries} />
          <GridHeading
            title="Highest Rated Series"
            page={highestRatedSeriesPage}
            setPage={setHighestRatedSeriesPage}
          />
          <MediaGrid useMediaHook={useHighestRatedSeries} />
        </>
      )}
    </>
  );
};

export default SeriesContent;

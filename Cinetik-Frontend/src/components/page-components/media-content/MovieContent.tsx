import GridHeading from "@/components/media-grids/GridHeading";
import SearchBar from "@/components/filters/SearchBar";
import FilteredMediaGrid from "@/components/media-grids/FilteredMediaGrid";
import MediaGrid from "@/components/media-grids/MediaGrid";
import useTrendingMovies from "@/hooks/movies/use-trending-movies";
import useHighestRatedMovies from "@/hooks/movies/use-highest-rated-movies";
import useMediaStore from "@/hooks/use-media-store";
import SearchMediaGrid from "@/components/media-grids/SearchMediaGrid";
import { usePaginationStore } from "@/hooks/use-pagination-store";

const MovieContent = () => {
  const { selectedGenres, selectedPlatforms, selectedSort, searchQuery } =
    useMediaStore();

  const {
    highestRatedMoviesPage,
    trendingMoviesPage,
    searchPage,
    filteredPage,
    setSearchPage,
    setFilteredPage,
    setHighestRatedMoviesPage,
    setTrendingMoviesPage,
  } = usePaginationStore();

  const shouldShowFiltered =
    selectedGenres.movieIds.length > 0 ||
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
          <SearchMediaGrid query={searchQuery} media_type="movie" />
        </>
      ) : shouldShowFiltered ? (
        <>
          <GridHeading
            title="Movies"
            page={filteredPage}
            setPage={setFilteredPage}
          />
          <FilteredMediaGrid media_type="movie" />
        </>
      ) : (
        <>
          <GridHeading
            title="Trending Movies"
            page={trendingMoviesPage}
            setPage={setTrendingMoviesPage}
          />
          <MediaGrid useMediaHook={useTrendingMovies} />
          <GridHeading
            title="Highest Rated Movies"
            page={highestRatedMoviesPage}
            setPage={setHighestRatedMoviesPage}
          />
          <MediaGrid useMediaHook={useHighestRatedMovies} />
        </>
      )}
    </>
  );
};

export default MovieContent;

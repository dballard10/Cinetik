import useSearchMedia from "./use-search-media";

const useSearchBoth = (query: string) => {
  // Get filtered movies
  const moviesQuery = useSearchMedia(query, "movie");

  // Get filtered TV shows
  const tvQuery = useSearchMedia(query, "tv");

  // Combine the results and remove duplicates
  const uniqueItems = new Map();

  // Add movies to the map (using id as key to prevent duplicates)
  if (moviesQuery.data) {
    moviesQuery.data.forEach((item) => {
      uniqueItems.set(item.id, item);
    });
  }

  // Add TV shows to the map (using id as key to prevent duplicates)
  if (tvQuery.data) {
    tvQuery.data.forEach((item) => {
      uniqueItems.set(item.id, item);
    });
  }

  // Convert map values back to array
  const combinedResults = {
    data: Array.from(uniqueItems.values()),
    isLoading: moviesQuery.isLoading || tvQuery.isLoading,
    isError: !!moviesQuery.error || !!tvQuery.error,
    error: moviesQuery.error || tvQuery.error,
  };

  combinedResults.data.sort((a, b) => b.vote_count - a.vote_count);

  return combinedResults;
};

export default useSearchBoth;

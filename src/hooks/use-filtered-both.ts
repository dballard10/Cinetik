import useFilteredMedia from "./use-filtered-media";
import { usePaginationStore } from "./use-pagination-store";

const useFilteredBoth = (
  movie_genres_list: string,
  tv_genres_list: string,
  platform_list: string,
  sort_by: string
) => {
  const { setFilteredBothTotalPages } = usePaginationStore();

  // Get filtered movies
  const moviesQuery = useFilteredMedia(
    movie_genres_list,
    platform_list,
    sort_by,
    "movie"
  );

  // Get filtered TV shows
  const tvQuery = useFilteredMedia(
    tv_genres_list,
    platform_list,
    sort_by,
    "tv"
  );

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

  // Set a combined total pages estimate (this is approximate since we're combining two different endpoints)
  if (moviesQuery.data || tvQuery.data) {
    setFilteredBothTotalPages(500); // Set to max since it's combined data
  }

  // Convert map values back to array
  const combinedResults = {
    data: Array.from(uniqueItems.values()),
    isLoading: moviesQuery.isLoading || tvQuery.isLoading,
    isError: !!moviesQuery.error || !!tvQuery.error,
    error: moviesQuery.error || tvQuery.error,
  };

  // Sort the combined results based on the selected sort filter or by rating/popularity by default
  if (combinedResults.data && combinedResults.data.length > 0) {
    if (sort_by) {
      // If a sort filter is selected, sort based on that
      if (sort_by.includes("vote_count")) {
        // For popularity sorting, we need to sort by vote_average
        combinedResults.data.sort((a, b) => {
          if (sort_by === "vote_count.desc") {
            return b.vote_count - a.vote_count;
          } else {
            return a.vote_count - b.vote_count;
          }
        });
      } else if (sort_by.includes("name")) {
        // For alphabetical sorting
        combinedResults.data.sort((a, b) => {
          if (sort_by === "name.desc") {
            return b.name.localeCompare(a.name);
          } else {
            return a.name.localeCompare(b.name);
          }
        });
      } else if (sort_by.includes("first_air_date")) {
        // For date sorting, we need to handle undefined release dates
        combinedResults.data.sort((a, b) => {
          const dateA = a.release_date || "";
          const dateB = b.release_date || "";
          if (sort_by === "first_air_date.desc") {
            return dateB.localeCompare(dateA);
          } else {
            return dateA.localeCompare(dateB);
          }
        });
      }
      // } else if (sort_by.includes("vote_average")) {
      //   // For rating sorting
      //   combinedResults.data.sort((a, b) => {
      //     if (sort_by === "vote_average.desc") {
      //       return b.vote_average - a.vote_average;
      //     } else {
      //       return a.vote_average - b.vote_average;
      //     }
      //   });
      // }
    } else {
      // Default sorting by rating/popularity (descending)
      combinedResults.data.sort((a, b) => b.vote_count - a.vote_count);
    }
  }

  return combinedResults;
};

export default useFilteredBoth;

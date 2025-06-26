import Separator from "../page-components/Separator";
import PageNavigation from "../page-components/PageNavigation";
import { usePaginationStore } from "@/hooks/use-pagination-store";

const GridHeading = ({
  title,
  page,
  setPage,
  totalPages,
}: {
  title: string;
  page: number;
  setPage: (page: number) => void;
  totalPages?: number;
}) => {
  const {
    highestRatedMoviesTotalPages,
    trendingMoviesTotalPages,
    highestRatedSeriesTotalPages,
    trendingSeriesTotalPages,
    trendingTotalPages,
    searchTotalPages,
    filteredTotalPages,
    filteredBothTotalPages,
  } = usePaginationStore();

  // Determine if this title should show pagination and get appropriate total pages
  const getPaginationInfo = () => {
    switch (title) {
      case "Your Favorites":
      case "Your Watches":
        return { shouldShow: true, total: totalPages || 1 };

      case "Trending Movies":
        return { shouldShow: true, total: trendingMoviesTotalPages };

      case "Highest Rated Movies":
        return { shouldShow: true, total: highestRatedMoviesTotalPages };

      case "Trending Series":
        return { shouldShow: true, total: trendingSeriesTotalPages };

      case "Highest Rated Series":
        return { shouldShow: true, total: highestRatedSeriesTotalPages };

      case "Trending":
        return { shouldShow: true, total: trendingTotalPages };

      case "Movies":
      case "Series":
        return { shouldShow: true, total: filteredTotalPages };

      case "Movies & Series":
        return { shouldShow: true, total: filteredBothTotalPages };

      default:
        // Handle search results
        if (title.startsWith("Search Results for")) {
          return { shouldShow: true, total: searchTotalPages };
        }
        return { shouldShow: false, total: 1 };
    }
  };

  const { shouldShow, total } = getPaginationInfo();

  return (
    <div>
      <div className="flex items-center justify-center pb-2 pt-4">
        <h1 className="text-center text-3xl font-bold tracking-tight text-white pb-2 pt-4">
          {title}
        </h1>
      </div>
      {shouldShow && total > 1 && (
        <PageNavigation
          currentPage={page}
          totalPages={total}
          onPageChange={setPage}
        />
      )}
      <Separator />
    </div>
  );
};

export default GridHeading;

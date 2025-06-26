import React from "react";
import { cn } from "@/lib/utils";
import NextPageButton from "./NextPageButton";
import PrevPageButton from "./PrevPageButton";

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageNavigation = ({
  currentPage,
  totalPages,
  onPageChange,
}: PageNavigationProps) => {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  // Calculate which page numbers to show (sliding window of 5 pages)
  const getPageNumbers = () => {
    const maxVisible = 5;
    const pages = [];

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate start and end for sliding window
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);

      // Adjust start if we're near the end
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }

      // Add pages to array
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {/* Previous Button */}
      <PrevPageButton page={currentPage} setPage={onPageChange} />

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((pageNum) => {
          const isCurrentPage = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum as number)}
              className={cn(
                "min-w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors",
                isCurrentPage
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              )}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <NextPageButton
        page={currentPage}
        setPage={onPageChange}
        isDisabled={isLastPage}
      />
    </div>
  );
};

export default PageNavigation;

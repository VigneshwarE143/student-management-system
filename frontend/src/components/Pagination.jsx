import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between gap-4 mt-8">
      <Button
        variant="ghost"
        size="sm"
        disabled={!canGoPrev}
        onClick={() => onPageChange(currentPage - 1)}
        icon={<ChevronLeftIcon className="h-4 w-4" />}
      >
        Previous
      </Button>

      <span className="text-sm text-gray-400">
        Page <span className="font-semibold text-white">{currentPage}</span> of{" "}
        <span className="font-semibold text-white">{totalPages}</span>
      </span>

      <Button
        variant="ghost"
        size="sm"
        disabled={!canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

import { DoubleArrowSVG, PaginationArrowSVG } from "public/svg/index";
import cn from "utils/cn";

type PaginationProps = {
  currentPage: number;
  take: number;
  total: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  take,
  total,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / take);
  const visiblePages = 5;
  const half = Math.floor(visiblePages / 2);

  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + visiblePages - 1);

  if (end - start < visiblePages - 1) {
    start = Math.max(1, end - visiblePages + 1);
  }

  return (
    <nav className="mt-4 flex gap-2">
      <div className="flex items-center gap-2.5">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          className="flex size-9 items-center justify-center"
        >
          <DoubleArrowSVG className="stroke-gray400 size-4 -scale-x-100" />
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex size-9 items-center justify-center"
        >
          <PaginationArrowSVG className="stroke-gray400 size-4 -scale-x-100" />
        </button>
      </div>

      {Array.from({ length: end - start + 1 }).map((_, i) => {
        const pageNumber = start + i;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              currentPage === pageNumber &&
                "text-main rounded-full bg-[#D7DAFF]",
              "text-gray600 size-9 text-base",
            )}
          >
            {pageNumber}
          </button>
        );
      })}

      <div className="flex items-center gap-2.5">
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex size-9 items-center justify-center"
        >
          <PaginationArrowSVG className="stroke-gray400 size-4" />
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          className="flex size-9 items-center justify-center"
        >
          <DoubleArrowSVG className="stroke-gray400 size-4" />
        </button>
      </div>
    </nav>
  );
}

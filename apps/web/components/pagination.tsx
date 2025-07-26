import { DoubleArrowSVG, PaginationArrowSVG } from "public/svg";
import cn from "libs/cn";

type PaginationProps = {
  currentPage: number;
  take: number;
  total: number;
  onPageChange: (page: number) => void;
};

const PageIconButton = ({
  onClick,
  disabled,
  icon,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactElement;
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="group flex size-9 items-center justify-center rounded-full hover:bg-[#D7DAFF]"
  >
    {icon}
  </button>
);

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
    <nav className="mt-4 flex gap-3">
      <div className="flex items-center gap-2.5">
        <PageIconButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          icon={
            <DoubleArrowSVG className="group-hover:stroke-main stroke-gray400 size-4 -scale-x-100" />
          }
        />
        <PageIconButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          icon={
            <PaginationArrowSVG className="group-hover:stroke-main stroke-gray400 size-4 -scale-x-100" />
          }
        />
      </div>

      <div className="flex items-center gap-3">
        {Array.from({ length: end - start + 1 }).map((_, i) => {
          const pageNumber = start + i;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={cn(
                currentPage === pageNumber &&
                  "text-main rounded-full bg-[#D7DAFF]",
                "text-gray600 hover:text-main size-9 text-base",
              )}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2.5">
        <PageIconButton
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          icon={
            <PaginationArrowSVG className="group-hover:stroke-main stroke-gray400 size-4" />
          }
        />
        <PageIconButton
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          icon={
            <DoubleArrowSVG className="group-hover:stroke-main stroke-gray400 size-4" />
          }
        />
      </div>
    </nav>
  );
}

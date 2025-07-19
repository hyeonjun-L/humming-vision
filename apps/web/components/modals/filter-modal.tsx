"use client";

import { useModalStore } from "stores/use-modal.store";
import { X } from "lucide-react";
import { ArrowSVG } from "public/svg";
import { usePathname, useSearchParams } from "next/navigation";
import {
  FILTER_CONFIGS,
  RouteCategory,
} from "@/(products)/_constants/products.const";
import { useUpdateSearchParams } from "hooks/useUpdateSearchParams";
import ProductsFilter from "components/products-filter/products-filter";
import RefreshButton from "components/products-filter/refresh-button";
import SearchProduct from "@/_components/search-product";

type FilterModalProps = {};

function FilterModal({}: FilterModalProps) {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const currentCategory = pathname.split("/")[1] as RouteCategory;

  const filterConfigs = FILTER_CONFIGS[currentCategory];

  const closeModal = useModalStore((state) => state.closeModal);

  const { deleteSearchParams } = useUpdateSearchParams();

  const formatFilterValue = (value: string | null, title: string) => {
    if (!value) return title;

    if (value.includes(",")) {
      const [start, end] = value.split(",");
      return `${start} ~ ${end}`;
    }

    return value;
  };

  return (
    <section className="bg-background absolute right-0 flex h-screen w-full flex-col overflow-scroll px-10 py-5 sm:w-[476px]">
      <header className="mb-5 flex w-full items-center justify-between">
        <button
          onClick={closeModal}
          className="border-gray200 flex size-10 items-center justify-center rounded-full border"
          aria-label="모달 닫기"
        >
          <ArrowSVG className="stroke-main size-5 stroke-2" />
        </button>
        <div className="text-gray600 absolute left-1/2 -translate-x-1/2 text-xl">
          상세검색
        </div>
      </header>
      <div className="border-gray200 flex flex-wrap gap-1.5 border-b pb-5">
        {filterConfigs?.map(({ key, title }) => {
          const value = searchParams.get(key);
          const displayText = formatFilterValue(value, title);

          return (
            value && (
              <button
                key={key}
                onClick={() => {
                  deleteSearchParams(key);
                }}
                className="bg-blue200 border-gray200 flex shrink-0 items-center rounded-[3px] border px-2.5 py-2 text-sm font-semibold whitespace-nowrap text-white"
              >
                {displayText}
                <X className="ml-1 size-4" />
              </button>
            )
          );
        })}
      </div>
      <SearchProduct className="mt-5 w-full" />
      <ProductsFilter />
      <RefreshButton />
    </section>
  );
}

export default FilterModal;

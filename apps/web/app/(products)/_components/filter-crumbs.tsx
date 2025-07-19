"use client";
import { useSearchParams } from "next/navigation";
import { FILTER_CONFIGS, RouteCategory } from "../_constants/products.const";
import cn from "libs/cn";
import { ChevronDown, X } from "lucide-react";

interface FilterCrumbsProps {
  currentCategory: RouteCategory;
}

function FilterCrumbs({ currentCategory }: FilterCrumbsProps) {
  const searchParams = useSearchParams();

  const filterConfigs = FILTER_CONFIGS[currentCategory];

  return (
    <div className="border-gray200 relative mb-10 w-full overflow-hidden border-y py-5 md:hidden">
      <div className="mx-auto w-max px-[10%]">
        <div className="flex flex-nowrap gap-1.5 overflow-hidden">
          {filterConfigs?.map(({ key, title }) => {
            const value = searchParams.get(key);
            return (
              <button
                key={key}
                disabled={!value}
                className={cn(
                  "border-gray200 shrink-0 rounded-[3px] border px-2.5 py-2 text-sm whitespace-nowrap text-[#666970]",
                  {
                    "bg-main flex items-center font-semibold text-white": value,
                  },
                )}
              >
                {value ? value : title}
                {value && <X className="ml-1 size-4" />}
              </button>
            );
          })}
        </div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-white/100 to-white/0" />
      </div>
      <button className="border-gray200 absolute top-1/2 right-0 flex size-7 -translate-y-1/2 items-center justify-center rounded-full border">
        <ChevronDown className={cn("text-gray400 size-4")} />
      </button>
    </div>
  );
}

export default FilterCrumbs;

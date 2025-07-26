"use client";

import { SearchInput } from "components/input";
import { useUpdateSearchParams } from "hooks/useUpdateSearchParams";
import cn from "libs/cn";
import { useSearchParams } from "next/navigation";

interface SearchProductProps {
  className?: string;
}

function SearchProduct({ className }: SearchProductProps) {
  const searchParams = useSearchParams();
  const { updateSearchParams } = useUpdateSearchParams();
  const searchValue = searchParams.get("where__name__i_like");

  const handleSearchSubmit = (value: string) => {
    updateSearchParams("where__name__i_like", value);
  };

  return (
    <div className={cn("mr-auto mb-5", className)}>
      <SearchInput
        onSubmit={handleSearchSubmit}
        placeholder="모델명을 검색해주세요"
        defaultValue={searchValue ?? ""}
      />
    </div>
  );
}

export default SearchProduct;

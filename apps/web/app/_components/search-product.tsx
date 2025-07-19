"use client";

import { SearchInput } from "components/input";
import { useUpdateSearchParams } from "hooks/useUpdateSearchParams";
import { useSearchParams } from "next/navigation";

function SearchProduct() {
  const searchParams = useSearchParams();
  const { updateSearchParams } = useUpdateSearchParams();
  const searchValue = searchParams.get("where__name__i_like");

  const handleSearchSubmit = (value: string) => {
    updateSearchParams("where__name__i_like", value);
  };

  return (
    <div className="mr-auto mb-5 hidden w-[309px] md:block">
      <SearchInput
        onSubmit={handleSearchSubmit}
        placeholder="모델명을 검색해주세요"
        defaultValue={searchValue ?? ""}
      />
    </div>
  );
}

export default SearchProduct;

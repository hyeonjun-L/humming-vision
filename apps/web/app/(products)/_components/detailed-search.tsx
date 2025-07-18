"use client";

import ProductsFilter from "components/products-filter/products-filter";
import TypeNav from "./type-nav";
import { usePathname } from "next/navigation";
import { CategoryRelationMapKebab } from "@humming-vision/shared";
import cn from "libs/cn";
import RefreshButton from "components/products-filter/refresh-button";
import SearchProduct from "@/_components/search-product";

function DetailedSearch({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const currentCategory = pathname.split("/")[1] as CategoryRelationMapKebab;

  return (
    <section
      className={cn("relative mx-5 flex justify-center", {
        "md:mr-54": currentCategory !== "light",
      })}
    >
      <div
        className={cn(
          "sticky top-0 mr-5 hidden h-fit w-52 pt-48 md:block md:pl-5",
          {
            hidden: currentCategory === "light",
          },
        )}
      >
        <h3 className="text-gray600 mb-5 text-2xl font-bold">상세 검색</h3>
        <ProductsFilter />
        <RefreshButton />
      </div>
      <div
        className={cn(
          "flex w-full max-w-screen-lg flex-col items-center border-gray-200",
          {
            "md:border-l": currentCategory !== "light",
          },
        )}
      >
        <TypeNav />

        <div className="flex w-full flex-col sm:ml-5">
          <SearchProduct />
          {children}
        </div>
      </div>
    </section>
  );
}

export default DetailedSearch;

"use client";

import ProductsFilter from "components/products-filter/products-filter";
import TypeNav from "./type-nav";
import { usePathname } from "next/navigation";
import cn from "libs/cn";
import RefreshButton from "components/products-filter/refresh-button";
import SearchProduct from "@/_components/search-product";
import FilterCrumbs from "./filter-crumbs";
import { PRODUCT_TYPES, RouteCategory } from "../_constants/products.const";

function DetailedSearch({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const currentCategory = pathname.split("/")[1] as RouteCategory;
  const type = pathname.split(
    "/",
  )[2] as keyof (typeof PRODUCT_TYPES)[RouteCategory];

  const isSoftwareType = currentCategory === "etc" && type === "software";
  const isAccessoryType = currentCategory === "etc" && type === "accessory";
  const isLightType = currentCategory === "light" && type === undefined;

  return (
    <section className={cn("relative mx-5 flex justify-center")}>
      <div
        className={cn(
          "sticky top-0 mr-5 hidden h-fit w-52 shrink-0 pt-48 md:block md:pl-5",
          {
            "md:hidden": currentCategory === "light",
          },
        )}
      >
        <h3 className="text-gray600 mb-5 text-2xl font-bold">상세 검색</h3>
        <ProductsFilter />
        <RefreshButton />
      </div>
      <div
        className={cn(
          "flex w-full max-w-[1119px] min-w-0 flex-grow flex-col items-center border-gray-200",
          {
            "md:border-l": currentCategory !== "light",
          },
        )}
      >
        <TypeNav />
        <FilterCrumbs currentCategory={currentCategory} />
        <div className="flex w-full flex-col sm:ml-5">
          <SearchProduct
            className={cn("hidden w-[309px] md:block", {
              "md:hidden": isAccessoryType || isLightType,
              "block w-full sm:w-[309px]": isSoftwareType,
            })}
          />
          {children}
        </div>
      </div>
    </section>
  );
}

export default DetailedSearch;

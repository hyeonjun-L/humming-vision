import cn from "libs/cn";
import { HeaderState } from "../hooks/use-header-state.hook";

export function getHeaderClassName(state: HeaderState): string {
  const { isClient, isAdminLoginPage, headerVariant } = state;

  return cn(
    "group/header fixed top-0 z-(--z-header) flex w-full flex-col",
    "scroll-header",
    isClient && {
      "text-black fill-black shadow-sm": headerVariant === "admin",
      "text-white lg:hover:bg-white lg:hover:text-black fill-white":
        headerVariant === "home",
      "bg-white": headerVariant !== "home",
    },
    isAdminLoginPage && "hidden",
  );
}

export function getNavClassName(state: HeaderState): string {
  const { headerVariant } = state;

  return cn(
    "relative flex items-center max-w-8xl justify-between px-5 pt-10.5 sm:px-10 lg:items-start lg:justify-evenly lg:px-0",
    headerVariant === "admin" &&
      "gap-10 xl:gap-20 lg:justify-normal lg:mx-auto xl:w-7xl pb-10.5 lg:pb-0",
    headerVariant === "home" && "mb-7",
    headerVariant !== "home" &&
      headerVariant !== "admin" &&
      "mb-7 lg:mb-0 lg:hover:mb-7",
  );
}

export function getNavItemClassName(state: HeaderState): string {
  const { isClient } = state;
  const isPathActive = isClient && state.isClient;

  return cn(
    "decoration-main w-fit whitespace-nowrap underline-offset-8 group-hover/path:underline",
    isPathActive && "text-main font-bold",
  );
}

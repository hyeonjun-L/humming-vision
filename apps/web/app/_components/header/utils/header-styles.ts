import cn from "utils/cn";
import { HeaderState } from "../hooks/use-header-state";

export function getHeaderClassName(state: HeaderState): string {
  const { isClient, isAdminLoginPage, headerVariant } = state;

  return cn(
    "group/header fixed top-0 z-(--z-header) flex w-full flex-col",
    isClient && {
      "bg-white text-black fill-black": headerVariant === "admin",
      "text-white lg:hover:bg-white lg:hover:text-black fill-white":
        headerVariant === "home",
    },
    isAdminLoginPage && "hidden",
  );
}

export function getNavClassName(state: HeaderState): string {
  const { headerVariant } = state;

  return cn(
    "relative mb-10.5 flex w-full items-center justify-between px-5 pt-10.5 sm:px-10 lg:mx-auto lg:items-start lg:justify-evenly lg:px-0",
    headerVariant === "admin" && "gap-20 lg:justify-normal",
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

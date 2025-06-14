"use client";

import { usePathname } from "next/navigation";
import cn from "utils/cn";

type PropType = {
  children: React.ReactNode;
};

function HeaderWrapper({ children }: PropType) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "group/header fixed top-0 z-(--z-header) flex w-full flex-col",
        {
          "bg-white text-black": pathname !== "/",
          "text-white lg:hover:bg-white lg:hover:text-black": pathname === "/",
        },
      )}
    >
      {children}
    </header>
  );
}

export default HeaderWrapper;

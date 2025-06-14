"use client";
import Logo from "components/logo";
import { NAV_ITEMS } from "consts/route.const";
import Link from "next/link";
import HeaderNavModalViewButton from "./header-nav-modal-view-button";
import { usePathname } from "next/navigation";
import cn from "utils/cn";
import { useEffect, useState } from "react";

function Header() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header
      className={cn(
        "group/header fixed top-0 z-(--z-header) flex w-full flex-col",
        isClient && {
          "bg-white text-black": pathname !== "/",
          "text-white lg:hover:bg-white lg:hover:text-black": pathname === "/",
        },
      )}
    >
      <nav className="relative mb-10.5 flex w-full items-center justify-between px-5 pt-10.5 sm:px-10 lg:mx-auto lg:items-start lg:justify-evenly lg:px-0">
        <Logo />
        <HeaderNavModalViewButton />
        <div className="relative hidden items-start lg:flex lg:gap-9 lg:text-lg xl:text-xl 2xl:gap-13">
          {NAV_ITEMS.map(({ name, href, hrefs }) => {
            const mainHref =
              Array.isArray(hrefs) && hrefs.length > 0
                ? (hrefs[0]?.href ?? "#")
                : (href ?? "#");

            const isPathActive =
              isClient && pathname.startsWith(`/${name.toLowerCase()}`);

            return (
              <div
                key={name}
                className="group/path mt-4 flex flex-col items-start justify-start gap-11.5"
              >
                <Link
                  href={mainHref}
                  className={cn(
                    "decoration-main w-fit whitespace-nowrap underline-offset-8 group-hover/path:underline",
                    isPathActive && "text-main font-bold",
                  )}
                >
                  {name}
                </Link>
                <div className="group/sub invisible flex h-0 max-w-28 min-w-20 flex-col gap-5 group-hover/header:visible group-hover/header:h-auto">
                  {hrefs?.map(({ name: subName, href: subHref }) => (
                    <Link
                      key={subName}
                      href={subHref}
                      className={cn(
                        "hover:text-main w-full min-w-max text-base hover:font-bold",
                        isClient &&
                          pathname === subHref &&
                          "text-main font-bold group-hover/sub:font-normal group-hover/sub:text-black",
                      )}
                    >
                      {subName}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

export default Header;

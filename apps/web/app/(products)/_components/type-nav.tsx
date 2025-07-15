"use client";
import { usePathname } from "next/navigation";
import { RouteCategory, TYPE_DISPLAY_NAMES } from "../_constants/products";
import {
  RoutePath,
  RoutePathETC,
  RoutePathWithCategory,
} from "consts/route.const";
import Link from "next/link";
import cn from "libs/cn";

function TypeNav() {
  const pathname = usePathname();

  const currentCategory = pathname.split("/")[1] as RouteCategory;

  const isActiveRoute = (route: string) => {
    if (pathname === route) return true;

    const ETC_SOFTWARE_PREFIX = `/${RouteCategory.ETC}${RoutePathWithCategory.SOFTWARE}`;
    const ETC_ACCESSORY_PREFIX = `/${RouteCategory.ETC}${RoutePathWithCategory.ACCESSORY}`;

    if (
      route.startsWith(ETC_SOFTWARE_PREFIX) &&
      pathname.startsWith(ETC_SOFTWARE_PREFIX)
    ) {
      return true;
    }

    if (
      route.startsWith(ETC_ACCESSORY_PREFIX) &&
      pathname.startsWith(ETC_ACCESSORY_PREFIX)
    ) {
      return true;
    }

    if (route === RoutePath.LIGHT && pathname === RoutePath.LIGHT) return true;

    if (
      route === `${RoutePath.LIGHT}${RoutePathWithCategory.DOWNLOAD}` &&
      pathname === `${RoutePath.LIGHT}${RoutePathWithCategory.DOWNLOAD}`
    )
      return true;

    return false;
  };

  const PRODUCT_TYPE_ROUTE = {
    [RouteCategory.CAMERA]: {
      AREA: `${RoutePath.CAMERA}${RoutePathWithCategory.AREA}`,
      LINE: `${RoutePath.CAMERA}${RoutePathWithCategory.LINE}`,
    },
    [RouteCategory.LENS]: {
      CCTV: `${RoutePath.LENS}${RoutePathWithCategory.CCTV}`,
      TCL: `${RoutePath.LENS}${RoutePathWithCategory.TCL}`,
    },
    [RouteCategory.FRAMEGRABBER]: {
      COAXPRESS: `${RoutePath.FRAMEGRABBER}${RoutePathWithCategory.COAXPRESS}`,
      LINK: `${RoutePath.FRAMEGRABBER}${RoutePathWithCategory.LINK}`,
      USB: `${RoutePath.FRAMEGRABBER}${RoutePathWithCategory.USB}`,
      GIGE: `${RoutePath.FRAMEGRABBER}${RoutePathWithCategory.GIGE}`,
    },
    [RouteCategory.LIGHT]: {
      LIGHT: RoutePath.LIGHT,
      DOWNLOAD: `${RoutePath.LIGHT}${RoutePathWithCategory.DOWNLOAD}`,
    },
    [RouteCategory.ETC]: {
      SOFTWARE: `${RoutePath.ETC}${RoutePathWithCategory.SOFTWARE}${RoutePathETC.MATROX}`,
      ACCESSORY: `${RoutePath.ETC}${RoutePathWithCategory.ACCESSORY}${RoutePathETC.CONVERTER}`,
    },
  } as const;

  return (
    <div className="mt-6 mb-16 flex flex-col items-center gap-5">
      <p className="text-gray600 text-[26px] font-bold">Type</p>
      <nav className="flex gap-2.5">
        {Object.entries(PRODUCT_TYPE_ROUTE[currentCategory]).map(
          ([typeName, route]) => (
            <Link
              key={typeName}
              href={route}
              className={cn(
                "flex w-[170px] items-center justify-center rounded-sm border py-2 transition-all duration-200",
                isActiveRoute(route)
                  ? "border-main text-main bg-[#F5F5FC]"
                  : "border-gray200 text-gray600 hover:border-main/50 hover:text-main hover:bg-[#F5F5FC]/50",
              )}
            >
              {TYPE_DISPLAY_NAMES[
                typeName as keyof typeof TYPE_DISPLAY_NAMES
              ] || typeName}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}

export default TypeNav;

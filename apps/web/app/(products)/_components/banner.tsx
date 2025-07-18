"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ROUTE_CATEGORY_DISPLAY_NAMES,
  RouteCategory,
} from "../_constants/products.const";
import {
  cameraBanner,
  frameGrabberBanner,
  lensBanner,
  etcBanner,
  lightBanner,
} from "public/product-banner/index";
import cn from "libs/cn";

function Banner() {
  const pathname = usePathname();

  const currentCategory = pathname.split("/")[1] as RouteCategory;

  const BANNER_IMAGE = {
    [RouteCategory.CAMERA]: cameraBanner,
    [RouteCategory.LENS]: lensBanner,
    [RouteCategory.FRAMEGRABBER]: frameGrabberBanner,
    [RouteCategory.ETC]: etcBanner,
    [RouteCategory.LIGHT]: lightBanner,
  } as const;

  return (
    <div className="relative">
      <h2
        className={cn(
          "text-gray600 absolute top-1/2 left-[18%] -translate-y-1/2 transform text-2xl font-bold whitespace-nowrap sm:text-[40px] xl:text-6xl",
          {
            "text-white": BANNER_IMAGE[currentCategory] === cameraBanner,
          },
        )}
      >
        {ROUTE_CATEGORY_DISPLAY_NAMES[currentCategory]}
      </h2>
      <Image
        src={BANNER_IMAGE[currentCategory]}
        alt={`${ROUTE_CATEGORY_DISPLAY_NAMES[currentCategory]} 배너 이미지`}
        priority
        height={230}
        className="h-[124px] w-full object-cover object-[60%_center] sm:h-[230px]"
      />
    </div>
  );
}

export default Banner;

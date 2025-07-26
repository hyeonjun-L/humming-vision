"use client";

import Link from "next/link";
import {
  RoutePath,
  RoutePathETC,
  RoutePathWithCategory,
} from "consts/route.const";
import cn from "libs/cn";
import { usePathname } from "next/navigation";

const SOFTWARE_LINKS: { name: string; link: string }[] = [
  {
    name: "Matrox",
    link: `${RoutePath.ETC}${RoutePathWithCategory.SOFTWARE}${RoutePathETC.MATROX}`,
  },
  {
    name: "Euresys",
    link: `${RoutePath.ETC}${RoutePathWithCategory.SOFTWARE}${RoutePathETC.EURESYS}`,
  },
];

const ACCESSORY_LINKS: { name: string; link: string }[] = [
  {
    name: "Converter",
    link: `${RoutePath.ETC}${RoutePathWithCategory.ACCESSORY}${RoutePathETC.CONVERTER}`,
  },
  {
    name: "Cable",
    link: `${RoutePath.ETC}${RoutePathWithCategory.ACCESSORY}${RoutePathETC.CABLE}`,
  },
  {
    name: "Bracket",
    link: `${RoutePath.ETC}${RoutePathWithCategory.ACCESSORY}${RoutePathETC.BRACKET}`,
  },
];

interface ETCFilterProps {
  className?: string;
}

function ETCFilter({ className }: ETCFilterProps) {
  const pathName = usePathname();

  const currentType = pathName.split("/")[2] as "software" | "accessory";

  const LINK_LIST =
    currentType === "software" ? SOFTWARE_LINKS : ACCESSORY_LINKS;

  return (
    <div className={cn("mt-5 flex flex-col gap-2.5", className)}>
      {LINK_LIST.map(({ name, link }) => (
        <Link
          key={name}
          href={link}
          className={cn(
            "border-gray200 text-gray600 hover:bg-main/75 h-11 rounded-[3px] border px-5 py-2.5 text-base font-normal hover:text-white",
            {
              "bg-main font-semibold text-white": link === pathName,
            },
          )}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}

export default ETCFilter;

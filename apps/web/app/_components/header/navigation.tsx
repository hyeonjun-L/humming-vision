import Link from "next/link";
import cn from "utils/cn";
import { type NavItem, type NavItemWithSubmenu } from "consts/route.const";
import { HeaderState } from "./hooks/use-header-state.hook";

interface NavigationProps {
  navItems: NavItem[];
  state: HeaderState;
}

function hasSubmenus(item: NavItem): item is NavItemWithSubmenu {
  return "hrefs" in item;
}

export function Navigation({ navItems, state }: NavigationProps) {
  const { isClient, headerVariant, pathname } = state;

  return (
    <div className="relative hidden items-start lg:flex lg:gap-9 lg:text-lg xl:text-xl 2xl:gap-13">
      {navItems.map((item) => {
        const { name } = item;

        const mainHref = hasSubmenus(item)
          ? (item.hrefs[0]?.href ?? "#")
          : (item.href ?? "#");

        const isPathActive =
          isClient &&
          (headerVariant === "admin"
            ? mainHref === pathname
            : pathname.startsWith(`/${name.toLowerCase()}`));

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
              {hasSubmenus(item) &&
                item.hrefs?.map(({ name: subName, href: subHref }) => (
                  <Link
                    key={subName}
                    href={subHref}
                    className={cn(
                      "hover:text-main w-full min-w-max text-base hover:font-bold",
                      isClient &&
                        pathname === subHref &&
                        "text-main roup-hover/sub:font-normal group-hover/sub:text-blacgk font-bold",
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
  );
}

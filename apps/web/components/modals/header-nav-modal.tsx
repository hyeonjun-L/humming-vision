"use client";
import {
  ADMIN_NAV_ITEMS,
  ADMIN_ROUTE_PATH,
  NAV_ITEMS,
  type NavItem,
} from "consts/route.const";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowSVG } from "public/svg/index";
import { useModalStore } from "stores/use-modal.store";
import cn from "utils/cn";

const hasSubmenu = (
  item: NavItem,
): item is { name: string; hrefs: { name: string; href: string }[] } => {
  return "hrefs" in item;
};

const hasDirectLink = (
  item: NavItem,
): item is { name: string; href: string } => {
  return "href" in item;
};

function HeaderNavModal() {
  const pathname = usePathname();
  const router = useRouter();

  const closeModal = useModalStore((state) => state.closeModal);

  const currentNavItems = pathname.startsWith(ADMIN_ROUTE_PATH)
    ? ADMIN_NAV_ITEMS
    : NAV_ITEMS;

  const normalizeString = (str?: string) =>
    str
      ?.toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9가-힣]/g, "") || "";

  const handleNavigation = async (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    await closeModal();
    router.push(href);
  };

  return (
    <section className="bg-background absolute right-0 flex h-screen w-full flex-col overflow-scroll px-10 py-5 sm:w-[476px]">
      <div className="mb-16 flex w-full items-center justify-between">
        <button
          onClick={closeModal}
          className="border-gray200 flex size-10 items-center justify-center rounded-full border"
        >
          <ArrowSVG className="stroke-main size-5 stroke-2" />
        </button>
        <div className="text-gray600 absolute left-1/2 -translate-x-1/2 text-xl">
          전체메뉴
        </div>
      </div>
      <ul className="flex w-full flex-col">
        {currentNavItems.map((item, index) => {
          const { name } = item;
          const isLastItem = NAV_ITEMS.length - 1 === index;

          const isAdminPath = pathname.startsWith(ADMIN_ROUTE_PATH);
          const currentPathSegment = pathname.split("/")[isAdminPath ? 2 : 1];

          const targetName =
            isAdminPath && hasDirectLink(item) ? item.href.split("/")[2] : name;

          const isPathActive =
            normalizeString(currentPathSegment) === normalizeString(targetName);

          return (
            <li
              key={name}
              className={cn(
                "border-gray200 mb-10 flex min-h-24 w-full border-b pb-10",
                isLastItem && "mb-0 border-b-0",
              )}
            >
              {hasDirectLink(item) ? (
                <Link
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href)}
                  className={cn(
                    "text-gray600 w-40 font-semibold",
                    isPathActive && "text-main font-bold",
                  )}
                >
                  {name}
                </Link>
              ) : (
                <div
                  className={cn(
                    "text-gray400 w-40 font-semibold",
                    isPathActive && "text-main font-bold",
                  )}
                >
                  {name}
                </div>
              )}
              <div className="group flex flex-col gap-5">
                {hasSubmenu(item) &&
                  item.hrefs.map(({ name: subName, href: subHref }) => (
                    <Link
                      key={subName}
                      href={subHref}
                      onClick={(e) => handleNavigation(e, subHref)}
                      className={cn(
                        "hover:text-main w-full min-w-max text-base hover:font-bold",
                        pathname === subHref &&
                          "text-main font-bold group-hover:font-normal group-hover:text-black",
                      )}
                    >
                      {subName}
                    </Link>
                  ))}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default HeaderNavModal;

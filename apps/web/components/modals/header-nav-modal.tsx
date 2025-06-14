"use client";
import { NAV_ITEMS } from "consts/route.const";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowSVG } from "public/svg/index";
import { useModalStore } from "stores/use-modal.store";
import cn from "utils/cn";

function HeaderNavModal() {
  const pathname = usePathname();

  const closeModal = useModalStore((state) => state.closeModal);

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
        {NAV_ITEMS.map(({ name, href, hrefs }) => {
          const isContact = name === "Contact";

          const isPathActive = pathname.startsWith(`/${name.toLowerCase()}`);

          return (
            <li
              key={name}
              className={cn(
                "border-gray200 mb-10 flex min-h-24 w-full border-b pb-10",
                isContact && "mb-0 border-b-0",
              )}
            >
              {isContact ? (
                <Link
                  href={href!}
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
                {hrefs?.map(({ name: subName, href: subHref }) => (
                  <Link
                    key={subName}
                    href={subHref}
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

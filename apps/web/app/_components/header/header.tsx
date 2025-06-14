import Logo from "components/logo";
import { RoutePath, RoutePathWithCategory } from "consts/route.const";
import Link from "next/link";
import HeaderWrapper from "./header-wrapper";
import HeaderNavModalViewButton from "./header-nav-modal-view-button";

function Header() {
  const NAV_ITEMS = [
    {
      name: "Camera",
      hrefs: [
        {
          name: "Area Camera",
          href: `${RoutePath.CAMERA}${RoutePathWithCategory.AREA}`,
        },
        {
          name: "Line Scan Camera",
          href: `${RoutePath.CAMERA}${RoutePathWithCategory.LINE}`,
        },
      ],
    },
    {
      name: "Lens",
      hrefs: [
        {
          name: "CCTV Lens",
          href: `${RoutePath.LENS}${RoutePathWithCategory.CCTV}`,
        },
        {
          name: "TCL Lens",
          href: `${RoutePath.LENS}${RoutePathWithCategory.TCL}`,
        },
      ],
    },
    {
      name: "Frame Grabber",
      hrefs: [
        {
          name: "CoaXPress",
          href: `${RoutePath.FRAMEGRABBER}${RoutePathWithCategory.COAXPRESS}`,
        },
        {
          name: "Cammera Link",
          href: `${RoutePath.FRAMEGRABBER}${RoutePathWithCategory.LINK}`,
        },
        {
          name: "GigE",
          href: `${RoutePath.FRAMEGRABBER}${RoutePathWithCategory.GIGE}`,
        },
        {
          name: "USB",
          href: `${RoutePath.FRAMEGRABBER}${RoutePathWithCategory.USB}`,
        },
      ],
    },
    {
      name: "Light",
      hrefs: [
        {
          name: "Light",
          href: RoutePath.LIGHT,
        },
        {
          name: "Download",
          href: `${RoutePath.LIGHT}${RoutePathWithCategory.DOWNLOAD}`,
        },
      ],
    },
    {
      name: "ETC",
      hrefs: [
        {
          name: "Software",
          href: `${RoutePath.ETC}${RoutePathWithCategory.SOFTWARE}`,
        },
        {
          name: "Accessory",
          href: `${RoutePath.ETC}${RoutePathWithCategory.ACCESSORY}`,
        },
      ],
    },
    { name: "Contact", href: RoutePath.CONTACT },
  ];

  return (
    <HeaderWrapper>
      <nav className="relative mb-10.5 flex w-full items-center justify-between px-5 pt-10.5 sm:px-10 lg:mx-auto lg:items-start lg:justify-evenly lg:px-0">
        <Logo />
        <HeaderNavModalViewButton />
        <div className="relative hidden items-start lg:flex lg:gap-9 lg:text-lg xl:text-xl 2xl:gap-13">
          {NAV_ITEMS.map(({ name, href, hrefs }) => {
            const mainHref =
              Array.isArray(hrefs) && hrefs.length > 0
                ? (hrefs[0]?.href ?? "#")
                : (href ?? "#");

            return (
              <div
                key={name}
                className="group/path mt-4 flex flex-col items-start justify-start gap-11.5"
              >
                <Link
                  href={mainHref}
                  className="decoration-main w-fit whitespace-nowrap underline-offset-8 group-hover/path:underline"
                >
                  {name}
                </Link>
                <div className="invisible flex h-0 max-w-28 min-w-20 flex-col gap-5 group-hover/header:visible group-hover/header:h-auto">
                  {hrefs?.map(({ name: subName, href: subHref }) => (
                    <Link
                      key={subName}
                      href={subHref}
                      className="hover:text-main w-full min-w-max text-base hover:font-bold"
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
    </HeaderWrapper>
  );
}

export default Header;

import Logo from "components/logo";
import { RoutePath, RoutePathWithCategory } from "consts/route.const";
import Link from "next/link";
import HeaderWrapper from "./header-wrapper.client";

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
      <nav className="relative mx-auto mb-10.5 flex w-full items-start justify-evenly pt-10.5">
        <Logo />
        <div className="relative flex items-start gap-13 text-xl">
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
                  className="decoration-main w-fit underline-offset-8 group-hover/path:underline"
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

import { RoutePath, RoutePathWithCategory } from "consts/route.const";
import Image from "next/image";
import Link from "next/link";
import {
  cameraHero,
  frameGrabberHero,
  lensHero,
  lightHero,
  etcHero,
} from "public/main/index";
import { PluseSVG } from "public/svg/index";

function Product() {
  const PRODUCT = [
    {
      image: cameraHero,
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
      image: lensHero,
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
      image: lightHero,
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
      image: frameGrabberHero,
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
      image: etcHero,
      name: "Etc",
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
  ];

  return (
    <section className="flex w-full flex-col items-center justify-center py-10 md:py-20 lg:py-32">
      <h2 className="text-gray600 mb-10 text-[30px] font-bold md:mb-[60px] md:text-[40px] lg:mb-24 lg:text-[50px]">
        Product
      </h2>
      <ul className="flex flex-wrap justify-center gap-5 sm:mx-10 lg:mx-0">
        {PRODUCT.map(({ image, name, hrefs }, index) => (
          <li key={index} className="flex flex-col items-center">
            <div className="relative mx-9 my-4 aspect-square h-24 md:mx-12 md:h-32 lg:mx-16 lg:h-[184px]">
              <Image
                src={image}
                alt={`Product ${index + 1}`}
                fill
                sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 184px"
                className="object-cover"
              />
            </div>
            <div className="bg-main flex h-8 w-full items-center justify-center text-lg font-bold text-white md:h-10 md:text-[20px] lg:h-16 lg:text-[28px]">
              {name}
            </div>
            {hrefs.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="group border-main text-main flex w-full items-center justify-between border-b px-2.5 py-2 md:py-2.5 lg:px-[20px] lg:py-[20px]"
              >
                <span className="text-sm font-light group-hover:font-medium md:text-base lg:text-xl">
                  {name}
                </span>
                <PluseSVG />
              </Link>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Product;

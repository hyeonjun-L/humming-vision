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
    <section className="flex w-full flex-col items-center justify-center">
      <h2 className="text-gray600 mt-32 mb-24 text-[50px] font-bold">
        Product
      </h2>
      <ul className="flex flex-wrap justify-center gap-5">
        {PRODUCT.map(({ image, name, hrefs }, index) => (
          <li key={index} className="flex flex-col items-center">
            <div className="relative mx-16 my-4 aspect-square h-[184px]">
              <Image
                src={image}
                alt={`Product ${index + 1}`}
                fill
                sizes="184px"
                className="object-cover"
              />
            </div>
            <div className="bg-main flex h-16 w-full items-center justify-center text-[28px] font-bold text-white">
              {name}
            </div>
            {hrefs.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="border-main text-main flex w-full items-center justify-between border-b py-5"
              >
                <span className="px-4 py-2 text-xl font-light">{name}</span>
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

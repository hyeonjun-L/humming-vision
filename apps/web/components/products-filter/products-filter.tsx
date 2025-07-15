"use client";
import { RouteCategory } from "@/(products)/_constants/products";
import { usePathname } from "next/navigation";
import CameraFilter from "./camera-filter";
import FrameGrabberFilter from "./frame-grabber-filter";
import LensFilter from "./lens-filter";
import ETCFilter from "./etc-filter";

function ProductsFilter() {
  const FILTER_OPTIONS = {
    [RouteCategory.CAMERA]: <CameraFilter />,
    [RouteCategory.FRAMEGRABBER]: <FrameGrabberFilter />,
    [RouteCategory.LENS]: <LensFilter />,
    [RouteCategory.LIGHT]: <div></div>,
    [RouteCategory.ETC]: <ETCFilter />,
  };

  const pathname = usePathname();

  const currentCategory = pathname.split("/")[1] as RouteCategory;

  return (
    <div className="border-gray200 w-full border-t">
      {FILTER_OPTIONS[currentCategory]}
    </div>
  );
}

export default ProductsFilter;

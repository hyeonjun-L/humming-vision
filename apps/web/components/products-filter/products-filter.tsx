"use client";
import { RouteCategory } from "@/(products)/_constants/products";
import { usePathname } from "next/navigation";
import {
  GetCameraQuery,
  GetFrameGrabberQuery,
  GetLensQuery,
  GetSoftwareQuery,
} from "@humming-vision/shared";
import CameraFilter from "./camera-filter";

function ProductsFilter() {
  const FILTER_OPTIONS = {
    [RouteCategory.CAMERA]: <CameraFilter />,
    [RouteCategory.FRAMEGRABBER]: <div></div>,
    [RouteCategory.LENS]: <div></div>,
    [RouteCategory.LIGHT]: <div></div>,
    [RouteCategory.ETC]: <div></div>,
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

import {
  PRODUCT_TYPES,
  RouteCategory,
} from "@/(products)/_constants/products.const";
import {
  RoutePath,
  RoutePathETC,
  RoutePathWithCategory,
} from "consts/route.const";
import { redirect } from "next/navigation";
import Converter from "./converter";

type AccessoryType =
  keyof (typeof PRODUCT_TYPES)[RouteCategory.ETC]["ACCESSORY"];

type Props = {
  params: { type: AccessoryType };
};

async function page({ params }: Props) {
  const { type } = await params;

  switch (type.toUpperCase()) {
    case "CONVERTER":
      return <Converter />;
    case "CABLE":
      return <div></div>;
    case "BRACKET":
      return <div></div>;
    default:
      redirect(
        `${RoutePath.ETC}${RoutePathWithCategory.ACCESSORY}${RoutePathETC.CONVERTER}`,
      );
  }
}

export default page;

import { Product } from "@humming-vision/shared";

type ProductImages = Product["images"];

function getRepresentativeImage(productImages: ProductImages) {
  const representativeImage = productImages
    .filter((img) => img.type === "PRODUCT")
    .reduce<null | (typeof productImages)[0]>((prev, curr) => {
      if (!prev || curr.order < prev.order) return curr;
      return prev;
    }, null);

  return representativeImage;
}

export default getRepresentativeImage;

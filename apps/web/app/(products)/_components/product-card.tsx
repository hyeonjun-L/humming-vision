import { CameraProduct } from "@humming-vision/shared";
import Accordion from "components/accordion";
import { Box } from "lucide-react";
import Image from "next/image";
import { CAMERA_CARD_FIELDS } from "../_constants/products.const";

interface ProductCardProps {
  product: CameraProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const representativeImage = product.images
    .filter((img) => img.type === "PRODUCT")
    .reduce<null | (typeof product.images)[0]>((prev, curr) => {
      if (!prev || curr.order < prev.order) return curr;
      return prev;
    }, null);

  return (
    <li className="flex w-40 flex-col items-center gap-2.5 sm:w-52">
      {representativeImage ? (
        <div className="relative aspect-[64/54] w-[64px]">
          <Image
            src={representativeImage.path}
            alt={product.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
      ) : (
        <Box className="text-gray300 aspect-[64/54] h-14 w-[64px]" />
      )}
      <span className="text-gray400 mr-auto text-sm">
        {product.camera.maker.charAt(0) +
          product.camera.maker.slice(1).toLowerCase()}
      </span>
      <span className="text-gray600 mr-auto">{product.name}</span>
      <Accordion
        title="상세 정보"
        className="w-full px-5 py-2.5 font-normal shadow-[0_0_4px_rgba(0,0,0,0.15)]"
        buttonClassName="py-0"
      >
        <dl className="border-gray200 mt-2.5 flex flex-col border-t pt-5">
          {CAMERA_CARD_FIELDS.map(({ label, accessor }) => (
            <div key={label} className="flex gap-2.5 text-xs">
              <dt className="text-[#666970]">{label}</dt>
              <dd className="text-gray600">{accessor(product)}</dd>
            </div>
          ))}
        </dl>
      </Accordion>
    </li>
  );
}

export default ProductCard;

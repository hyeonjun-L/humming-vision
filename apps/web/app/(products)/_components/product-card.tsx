import {
  CameraProduct,
  FrameGrabberProduct,
  LensProduct,
} from "@humming-vision/shared";
import Accordion from "components/accordion";
import { Box } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import getRepresentativeImage from "utils/get-representative-image";

interface ProductCardProps<
  T extends CameraProduct | LensProduct | FrameGrabberProduct,
> {
  product: T;
  productFields: { label: string; accessor: (product: T) => React.ReactNode }[];
}

function ProductCard<
  T extends CameraProduct | LensProduct | FrameGrabberProduct,
>({ product, productFields }: ProductCardProps<T>) {
  const representativeImage = getRepresentativeImage(product.images);

  const makerInfo = [
    product.camera?.maker,
    product.frameGrabber?.maker,
    product.lens?.maker,
  ].filter(Boolean) as string[];

  const pathname = usePathname();

  return (
    <li className="w-[48%] sm:w-[31%]">
      <Link
        className="flex size-full flex-col items-center gap-2.5"
        href={`${pathname}/${product.id}`}
      >
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
        <div className="flex w-full flex-col">
          {makerInfo.map((maker, idx) => (
            <span key={idx} className="text-gray400 mr-auto text-sm">
              {maker.charAt(0) + maker.slice(1).toLowerCase()}
            </span>
          ))}
          <span className="text-gray600 mr-auto">{product.name}</span>
        </div>
        <Accordion
          title="상세 정보"
          className="w-full px-5 py-2.5 font-normal shadow-[0_0_4px_rgba(0,0,0,0.15)]"
          buttonClassName="py-0"
        >
          <dl className="border-gray200 mt-2.5 flex flex-col border-t pt-5">
            {productFields.map(({ label, accessor }) => (
              <div key={label} className="flex gap-2.5 text-xs">
                <dt className="text-[#666970]">{label}</dt>
                <dd className="text-gray600">{accessor(product)}</dd>
              </div>
            ))}
          </dl>
        </Accordion>
      </Link>
    </li>
  );
}

export default ProductCard;

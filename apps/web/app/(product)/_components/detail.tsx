import {
  CategoryRelationMap,
  CategoryToProductTypeMap,
} from "@humming-vision/shared";
import { Download, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SameSensorCameras from "./same-sensor-cameras";
import { Suspense } from "react";

interface DetailProps<T extends keyof CategoryToProductTypeMap> {
  product: CategoryToProductTypeMap[T];
}

function Detail<T extends keyof CategoryToProductTypeMap>({
  product,
}: DetailProps<T>) {
  const productImages = product.images
    .filter((img) => img.type === "PRODUCT")
    .sort((a, b) => a.order - b.order);

  const specImages = product.images
    .filter((img) => img.type === "SPEC")
    .sort((a, b) => a.order - b.order);

  return (
    <main className="mx-auto my-33 w-full max-w-[1119px]">
      <section className="border-gray200 mb-20 flex justify-center border-y py-[60px]">
        <div className="relative h-[176px] w-[312px]">
          {productImages[0]?.path ? (
            <Image
              src={productImages[0].path || ""}
              alt={product.name}
              fill
              sizes="312px"
              priority
              className="object-cover"
            />
          ) : (
            <ImageIcon className="size-full text-gray-300" />
          )}
        </div>
        <div className="text-gray600 flex w-[535px] flex-col justify-center pl-4">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="mt-5 mb-10">{product.mainFeature}</p>
          <div className="flex gap-5">
            {product.datasheetUrl && (
              <Link
                href={product.datasheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[43px] w-[140px] items-center justify-center gap-2.5 border"
              >
                DataSheet
                <Download className="text-main size-5" />
              </Link>
            )}
            {product.drawingUrl && (
              <Link
                href={product.drawingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[43px] w-[140px] items-center justify-center gap-2.5 border"
              >
                Drawing
                <Download className="text-main size-5" />
              </Link>
            )}
            {product.manualUrl && (
              <Link
                href={product.manualUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[43px] w-[140px] items-center justify-center gap-2.5 border"
              >
                Manual
                <Download className="text-main size-5" />
              </Link>
            )}
          </div>
        </div>
      </section>
      <section className="mb-[72px] flex w-full flex-col items-center gap-8">
        <h3 className="text-[32px] font-bold">상세스펙</h3>

        {specImages.map((image) => (
          <div key={image.order} className="relative w-[649px]">
            <Image
              src={image.path || ""}
              alt={`Spec Image ${image.order}`}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full object-contain"
            />
          </div>
        ))}
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        {product.camera?.sensor && (
          <SameSensorCameras id={product.id} sensor={product.camera.sensor} />
        )}
      </Suspense>
    </main>
  );
}

export default Detail;

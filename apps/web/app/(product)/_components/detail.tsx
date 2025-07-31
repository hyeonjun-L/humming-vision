import { CategoryToProductTypeMap } from "@humming-vision/shared";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SameSensorCameras from "./same-sensor-cameras";
import { Suspense } from "react";
import SameSensorCamerasFallback from "./same-sensor-cameras-fallback";
import ProductImagesCarousel from "./product-images-carousel";

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

  const DOCUMENTS = [
    { label: "DataSheet", url: product.datasheetUrl },
    { label: "Drawing", url: product.drawingUrl },
    { label: "Manual", url: product.manualUrl },
  ];

  return (
    <main className="mx-auto my-33 w-full max-w-[1119px] px-5">
      <section className="border-gray200 mb-20 flex flex-wrap justify-center gap-10 border-y px-2 py-[40px] sm:flex-nowrap sm:gap-0 md:py-[60px]">
        <ProductImagesCarousel
          productImages={productImages}
          productName={product.name}
        />
        <div className="text-gray600 flex w-[415px] flex-col justify-center sm:pl-4 md:w-[535px]">
          <h2 className="text-xl font-semibold md:text-2xl">{product.name}</h2>
          <p className="mb-5 text-xs sm:mt-5 sm:mb-5 md:mb-10 md:text-base">
            {product.mainFeature}
          </p>
          <div className="flex gap-5">
            {DOCUMENTS.filter((doc) => !!doc.url).map((doc) => (
              <Link
                key={doc.label}
                href={doc.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-1/3 items-center justify-center gap-2.5 border py-2.5 text-sm md:py-[11.5px] md:text-base"
              >
                {doc.label}
                <Download className="text-main size-5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mb-[72px] flex w-full flex-col items-center gap-8">
        <h3 className="text-xl font-bold sm:text-2xl md:text-[32px]">
          상세스펙
        </h3>

        {specImages.map((image, index) => (
          <div key={image.order} className="relative w-full md:w-[649px]">
            <Image
              src={image.path || ""}
              alt={`Spec Image ${image.order}`}
              width={0}
              height={0}
              sizes="(min-width: 768px) 649px, 100vw"
              className="h-auto w-full object-contain"
              priority={index < 2}
            />
          </div>
        ))}
      </section>
      <Suspense fallback={<SameSensorCamerasFallback />}>
        {product.camera?.sensor && (
          <SameSensorCameras id={product.id} sensor={product.camera.sensor} />
        )}
      </Suspense>
    </main>
  );
}

export default Detail;

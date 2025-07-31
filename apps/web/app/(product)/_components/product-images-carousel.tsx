"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import type { Product } from "@humming-vision/shared";
import {
  NavButton,
  usePrevNextButtons,
} from "@/_components/carousel/EmblaCarouselArrowButtons";
import { useAutoplay } from "@/_components/carousel/EmblaCarouselAutoplay";

type ProductImages = Product["images"];

interface ProductImagesProps {
  productName: string;
  productImages: ProductImages;
}

export default function ProductImagesCarousel({
  productName,
  productImages,
}: ProductImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = productImages.length > 0;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2500, stopOnInteraction: false }),
  ]);

  const { pauseAndResumeAutoplay } = useAutoplay(emblaApi);

  const updateFromEmbla = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setCurrentIndex(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateFromEmbla);
    updateFromEmbla();
  }, [emblaApi, updateFromEmbla]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-[140px] w-[207px] shrink-0 overflow-hidden sm:h-[150px] sm:w-[230px] md:h-[176px] md:w-[312px]">
        {hasImages ? (
          <Image
            src={productImages[currentIndex]?.path || ""}
            alt={`${productName}-${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="(min-width: 768px) 312px, 207px"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-300">
            <ImageIcon className="h-10 w-10" />
          </div>
        )}
      </div>

      {hasImages && productImages.length > 1 && (
        <div className="mt-4 flex gap-4">
          <NavButton
            onClick={() => pauseAndResumeAutoplay(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          >
            <ChevronLeft className="size-5" />
          </NavButton>
          <div className="max-w-[200px] overflow-hidden" ref={emblaRef}>
            <div className="flex gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(index);
                    emblaApi?.scrollTo(index);
                  }}
                  className={`relative h-[64px] w-[90px] shrink-0 rounded-md border ${
                    currentIndex === index ? "border-main" : "border-gray200"
                  }`}
                >
                  <Image
                    src={image.path}
                    alt={`thumbnail-${index}`}
                    fill
                    className="object-cover"
                    sizes="90px"
                    priority
                  />
                </button>
              ))}
            </div>
          </div>
          <NavButton
            onClick={() => pauseAndResumeAutoplay(onNextButtonClick)}
            disabled={nextBtnDisabled}
          >
            <ChevronRight className="size-5" />
          </NavButton>
        </div>
      )}
    </div>
  );
}

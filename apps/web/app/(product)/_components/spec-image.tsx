"use client";

import Image from "next/image";
import { ModalEnum } from "consts/modal.const";
import { useModalStore } from "stores/use-modal.store";
import { ImageDimensions } from "utils/get-image-size";

interface SpecImageProps {
  src: string;
  alt: string;
  size: ImageDimensions | null;
  priority?: boolean;
}

const SIZES = "(min-width: 768px) 649px, 100vw";

function SpecImage({ src, alt, size, priority = false }: SpecImageProps) {
  const openModal = useModalStore((state) => state.openModal);

  // 원본 치수를 못 읽은 경우: 최소한 표시는 되도록 기존 방식으로 폴백
  if (!size) {
    return (
      <div className="relative w-full">
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes={SIZES}
          className="h-auto w-full object-contain"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        openModal(ModalEnum.IMAGE_ZOOM, {
          src,
          alt,
          width: size.width,
          height: size.height,
        })
      }
      aria-label={`${alt} 크게 보기`}
      className="mx-auto block cursor-zoom-in"
    >
      {/* w-auto + max-w-full: 원본보다 크게 늘리지 않고, 컨테이너를 넘을 때만 축소 */}
      <Image
        src={src}
        alt={alt}
        width={size.width}
        height={size.height}
        sizes={SIZES}
        className="mx-auto h-auto w-auto max-w-full"
        priority={priority}
      />
    </button>
  );
}

export default SpecImage;

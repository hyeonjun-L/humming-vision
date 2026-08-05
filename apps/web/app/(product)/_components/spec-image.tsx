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

const SIZES = "(min-width: 900px) 900px, 100vw";

/**
 * 스펙 이미지는 원본 너비가 309~1165px로 제각각이라 컨테이너에 그대로 맞추면
 * 작은 이미지가 과하게 확대되어 도면·사양표 글씨가 뭉개진다.
 * 컬럼을 채우되 원본의 이 배율까지만 확대한다.
 */
const MAX_UPSCALE = 1.5;

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
      className="mx-auto block w-full cursor-zoom-in"
    >
      {/* 컬럼을 채우되(w-full) 인라인 maxWidth가 확대 상한을 만든다 */}
      <Image
        src={src}
        alt={alt}
        width={size.width}
        height={size.height}
        sizes={SIZES}
        className="mx-auto h-auto w-full"
        style={{ maxWidth: `${Math.round(size.width * MAX_UPSCALE)}px` }}
        priority={priority}
      />
    </button>
  );
}

export default SpecImage;

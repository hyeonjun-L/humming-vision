"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useModalStore, ModalProps } from "stores/use-modal.store";
import { ModalEnum } from "consts/modal.const";

type ImageZoomModalProps = ModalProps[ModalEnum.IMAGE_ZOOM];

// 확대 보기는 본문(최대 1.5배)보다 확실히 커야 의미가 있으므로 상한을 더 넉넉히 둔다.
const MAX_UPSCALE = 2;

function ImageZoomModal({ src, alt, width, height }: ImageZoomModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <section className="flex w-[95vw] flex-col items-center gap-3">
      <button
        onClick={closeModal}
        aria-label="닫기"
        className="border-gray200 bg-background flex size-10 shrink-0 items-center justify-center self-end rounded-full border"
      >
        <X className="text-gray600 size-5" />
      </button>
      {/* 화면을 최대한 쓰되 원본의 2배까지만. 세로로 긴 이미지는 max-h가 잡아준다 */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="95vw"
        className="mx-auto h-auto max-h-[85vh] w-full object-contain"
        style={{ maxWidth: `min(95vw, ${Math.round(width * MAX_UPSCALE)}px)` }}
      />
    </section>
  );
}

export default ImageZoomModal;

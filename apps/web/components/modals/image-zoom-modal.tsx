"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useModalStore, ModalProps } from "stores/use-modal.store";
import { ModalEnum } from "consts/modal.const";

type ImageZoomModalProps = ModalProps[ModalEnum.IMAGE_ZOOM];

function ImageZoomModal({ src, alt, width, height }: ImageZoomModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <section className="flex max-h-[90vh] max-w-[95vw] flex-col items-center gap-3">
      <button
        onClick={closeModal}
        aria-label="닫기"
        className="border-gray200 bg-background flex size-10 shrink-0 items-center justify-center self-end rounded-full border"
      >
        <X className="text-gray600 size-5" />
      </button>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="95vw"
        className="max-h-[80vh] w-auto max-w-full object-contain"
      />
    </section>
  );
}

export default ImageZoomModal;

"use client";

import HeaderNavModal from "components/modals/header-nav-modal";
import { useModalStore, ModalProps } from "stores/use-modal.store";
import { useEffect, useState } from "react";
import { ModalEnum } from "consts/modal.const";
import ContactModal from "components/modals/contact-modal";
import FilterModal from "components/modals/filter-modal";
import ImageZoomModal from "components/modals/image-zoom-modal";

export default function ModalRoot() {
  const { modalType, modalProps } = useModalStore();
  const closeModal = useModalStore((state) => state.closeModal);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    useModalStore.getState().initializeBackHandler();
  }, []);

  useEffect(() => {
    setIsAnimating(!!modalType);

    if (modalType) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [modalType]);

  if (!modalType) return null;

  const renderModal = () => {
    switch (modalType) {
      case ModalEnum.HEADER_NAV:
        return (
          <HeaderNavModal
            {...(modalProps as ModalProps[ModalEnum.HEADER_NAV])}
          />
        );
      case ModalEnum.CONTACT:
        return (
          <ContactModal {...(modalProps as ModalProps[ModalEnum.CONTACT])} />
        );
      case ModalEnum.FILTER:
        return (
          <FilterModal {...(modalProps as ModalProps[ModalEnum.FILTER])} />
        );
      case ModalEnum.IMAGE_ZOOM:
        return (
          <ImageZoomModal
            {...(modalProps as ModalProps[ModalEnum.IMAGE_ZOOM])}
          />
        );
      default:
        return null;
    }
  };

  // 내비·필터는 오른쪽에서 슬라이드 인, 이미지 확대는 중앙 페이드 인
  const isCentered = modalType === ModalEnum.IMAGE_ZOOM;

  return (
    <div
      onClick={closeModal}
      className={`text-foreground max-w-8xl fixed top-1/2 left-1/2 z-(--z-modal) mx-auto size-full h-lvh -translate-x-1/2 -translate-y-1/2 transform bg-black/50 transition-opacity duration-300 ${
        isCentered ? "flex items-center justify-center p-4" : ""
      } ${isAnimating ? "opacity-100" : "opacity-0"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          isCentered
            ? `transition-opacity duration-300 ease-out ${
                isAnimating ? "opacity-100" : "opacity-0"
              }`
            : `transition-transform duration-300 ease-out ${
                isAnimating ? "translate-x-0" : "translate-x-full"
              }`
        }
      >
        {renderModal()}
      </div>
    </div>
  );
}

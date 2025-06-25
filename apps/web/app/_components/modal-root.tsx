"use client";

import HeaderNavModal from "components/modals/header-nav-modal";
import { useModalStore, ModalProps } from "stores/use-modal.store";
import { useEffect, useState } from "react";
import { ModalEnum } from "consts/modal.const";
import ContactModal from "components/modals/contact-modal";

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
      default:
        return null;
    }
  };

  return (
    <div
      onClick={closeModal}
      className={`text-foreground max-w-8xl fixed top-1/2 left-1/2 z-(--z-modal) mx-auto size-full h-screen -translate-x-1/2 -translate-y-1/2 transform bg-black/50 transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`transition-transform duration-300 ease-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {renderModal()}
      </div>
    </div>
  );
}

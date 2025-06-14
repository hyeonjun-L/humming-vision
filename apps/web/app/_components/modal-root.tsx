"use client";

import HeaderNavModal from "components/modals/header-nav-modal";
import { useModalStore } from "stores/use-modal.store";
import { ModalEnum } from "types/modal.type";
import { useEffect, useState } from "react";

export default function ModalRoot() {
  const { modalType, modalProps } = useModalStore();
  const closeModal = useModalStore((state) => state.closeModal);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    useModalStore.getState().initializeBackHandler();
  }, []);

  useEffect(() => {
    setIsAnimating(!!modalType);
  }, [modalType]);

  if (!modalType) return null;

  const renderModal = () => {
    switch (modalType) {
      case ModalEnum.HEADER_NAV:
        return <HeaderNavModal {...modalProps} />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={closeModal}
      className={`text-foreground max-w-8xl absolute z-(--z-modal) mx-auto size-full bg-black/50 transition-opacity duration-300 lg:hidden ${
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

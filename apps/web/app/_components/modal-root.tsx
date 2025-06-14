"use client";

import HeaderNavModal from "components/modals/header-nav-modal";
import { useModalStore } from "stores/use-modal.store";
import { ModalEnum } from "types/modal.type";
import { useEffect } from "react";

export default function ModalRoot() {
  const { modalType, modalProps } = useModalStore();
  const closeModal = useModalStore((state) => state.closeModal);

  useEffect(() => {
    useModalStore.getState().initializeBackHandler();
  }, []);

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
      className="text-foreground max-w-8xl absolute z-[9999] mx-auto size-full bg-black/50 lg:hidden"
    >
      <div onClick={(e) => e.stopPropagation()}>{renderModal()}</div>
    </div>
  );
}

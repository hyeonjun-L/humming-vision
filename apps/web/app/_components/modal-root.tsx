"use client";

import HeaderNavModal from "components/modals/header-nav-modal";
import { useModalStore } from "stores/use-modal.store";
import { ModalEnum } from "types/modal.type";

export default function ModalRoot() {
  const { modalType, modalProps } = useModalStore();

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
    <div className="text-foreground max-w-8xl absolute z-(--z-modal) mx-auto size-full bg-black/50 lg:hidden">
      {renderModal()}
    </div>
  );
}

"use client";
import { HambugerSVG } from "public/svg/index";
import { useModalStore } from "stores/use-modal.store";
import { ModalEnum } from "types/modal.type";

function HeaderNavModalViewButton() {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <button
      className="lg:hidden"
      onClick={() => openModal(ModalEnum.HEADER_NAV)}
    >
      <HambugerSVG />
    </button>
  );
}

export default HeaderNavModalViewButton;

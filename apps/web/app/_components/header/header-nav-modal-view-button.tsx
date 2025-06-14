"use client";
import { HambugerSVG } from "public/svg/index";
import { useModalStore } from "stores/use-modal.store";
import { ModalEnum } from "types/modal.type";

function HeaderNavModalViewButton() {
  const handleClick = () => {
    useModalStore.getState().openModal(ModalEnum.HEADER_NAV);
  };

  return (
    <button className="lg:hidden" onClick={handleClick}>
      <HambugerSVG />
    </button>
  );
}

export default HeaderNavModalViewButton;

"use client";
import { ModalEnum } from "consts/modal.const";
import { HambugerSVG } from "public/svg/index";
import { useModalStore } from "stores/use-modal.store";

function HeaderNavModalViewButton() {
  const handleClick = () => {
    useModalStore.getState().openModal(ModalEnum.HEADER_NAV, {});
  };

  return (
    <button aria-label="메뉴 열기" className="lg:hidden" onClick={handleClick}>
      <HambugerSVG />
    </button>
  );
}

export default HeaderNavModalViewButton;

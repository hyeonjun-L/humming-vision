import { ModalEnum } from "consts/modal.const";
import { Contact } from "@humming-vision/shared";
import { create } from "zustand";

export type ModalType = ModalEnum | null;

export interface ModalProps {
  [ModalEnum.HEADER_NAV]: Record<string, never>;
  [ModalEnum.CONTACT]: {
    data: Contact;
    onDelete: (id: number) => Promise<void>;
  };
  [ModalEnum.FILTER]: Record<string, never>;
}

interface ModalState {
  modalType: ModalType;
  modalProps?: ModalProps[keyof ModalProps];
  openModal: <T extends ModalEnum>(type: T, props: ModalProps[T]) => void;
  closeModal: () => Promise<void>;
  initializeBackHandler: () => void;
}

let isListenerAdded = false;

export const useModalStore = create<ModalState>((set, get) => {
  const handlePopState = () => {
    const currentState = get();
    if (currentState.modalType) {
      set({ modalType: null, modalProps: {} });
    }
  };

  return {
    modalType: null,
    modalProps: {},
    openModal: (type, props) => {
      if (typeof window === "undefined") return;

      if (!window.history.state?.modal) {
        window.history.pushState({ modal: true }, "");
      }

      if (!isListenerAdded) {
        window.addEventListener("popstate", handlePopState);
        isListenerAdded = true;
      }

      set({
        modalType: type,
        modalProps: props ?? {},
      });
    },

    closeModal: () => {
      return new Promise<void>((resolve) => {
        const currentState = get();

        if (typeof window === "undefined") {
          resolve();
          return;
        }

        if (!currentState.modalType) {
          resolve();
          return;
        }

        const handlePop = () => {
          resolve();
          window.removeEventListener("popstate", handlePop);
        };

        if (window.history.state?.modal) {
          window.addEventListener("popstate", handlePop);
          window.history.back();
        } else {
          set({ modalType: null, modalProps: {} });
          resolve();
        }
      });
    },

    initializeBackHandler: () => {
      if (typeof window === "undefined" || isListenerAdded) return;

      window.addEventListener("popstate", handlePopState);
      isListenerAdded = true;
    },
  };
});

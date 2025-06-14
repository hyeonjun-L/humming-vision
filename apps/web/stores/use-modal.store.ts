import { ModalType } from "types/modal.type";
import { create } from "zustand";

interface ModalState {
  modalType: ModalType;
  modalProps?: Record<string, unknown>;
  openModal: (type: ModalType, props?: Record<string, unknown>) => void;
  closeModal: () => void;
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
      const currentState = get();

      if (typeof window === "undefined") return;

      if (currentState.modalType && window.history.state?.modal) {
        window.history.back();
      } else {
        set({ modalType: null, modalProps: {} });
      }
    },

    initializeBackHandler: () => {
      if (typeof window === "undefined" || isListenerAdded) return;

      window.addEventListener("popstate", handlePopState);
      isListenerAdded = true;
    },
  };
});

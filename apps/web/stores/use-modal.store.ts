import { ModalType } from "types/modal.type";
import { create } from "zustand";

interface ModalState {
  modalType: ModalType;
  modalProps?: Record<string, unknown>;
  openModal: (type: ModalType, props?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  modalProps: {},
  openModal: (type, props) => set({ modalType: type, modalProps: props }),
  closeModal: () => set({ modalType: null, modalProps: {} }),
}));

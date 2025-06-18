import { Admin } from "@humming-vision/shared";
import { create } from "zustand";

interface AdminStore {
  admin: Admin | null;
  setAdmin: (admin: Admin) => void;
  clearAdmin: () => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  admin: null,
  setAdmin: (admin: Admin) => set({ admin }),
  clearAdmin: () => set({ admin: null }),
}));

import { toast, ToastOptions } from "react-toastify";

const DEFAULT_TOAST_CONFIG: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
} as const;

const TOAST_CONFIGS = {
  success: {
    ...DEFAULT_TOAST_CONFIG,
    autoClose: 3000,
  },
  error: {
    ...DEFAULT_TOAST_CONFIG,
    autoClose: 5000,
  },
  warning: {
    ...DEFAULT_TOAST_CONFIG,
    autoClose: 4000,
  },
  info: {
    ...DEFAULT_TOAST_CONFIG,
    autoClose: 3000,
  },
} as const;

export const showToast = {
  success: (message: string, customConfig?: Partial<ToastOptions>) =>
    toast.success(message, { ...TOAST_CONFIGS.success, ...customConfig }),

  error: (message: string, customConfig?: Partial<ToastOptions>) =>
    toast.error(message, { ...TOAST_CONFIGS.error, ...customConfig }),

  warning: (message: string, customConfig?: Partial<ToastOptions>) =>
    toast.warn(message, { ...TOAST_CONFIGS.warning, ...customConfig }),

  info: (message: string, customConfig?: Partial<ToastOptions>) =>
    toast.info(message, { ...TOAST_CONFIGS.info, ...customConfig }),

  default: (message: string, customConfig?: Partial<ToastOptions>) =>
    toast(message, { ...DEFAULT_TOAST_CONFIG, ...customConfig }),
};

export const TOAST_PRESETS = {
  quick: {
    ...DEFAULT_TOAST_CONFIG,
    autoClose: 2000,
    hideProgressBar: true,
  },

  important: {
    ...DEFAULT_TOAST_CONFIG,
    autoClose: 6000,
    pauseOnHover: true,
    closeOnClick: false,
  },

  minimal: {
    ...DEFAULT_TOAST_CONFIG,
    hideProgressBar: true,
    theme: "light" as const,
  },
} as const;

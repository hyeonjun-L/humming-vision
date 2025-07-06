import { UseFormSetError, UseFormSetFocus } from "react-hook-form";
import { ZodError } from "zod";
import { ProductUpdateFormData } from "../_types/product-update.type";
import { showToast } from "utils/toast-config";

interface ApiErrorResponse {
  error?: string;
  message?: string;
  field?: string;
  errors?: Array<{ field: string; message: string }>;
}

interface ApiError extends Error {
  response?: {
    data: ApiErrorResponse;
    status: number;
  };
}

export function handleUpdateFormErrors(
  error: unknown,
  setError: UseFormSetError<ProductUpdateFormData>,
  setFocus: UseFormSetFocus<ProductUpdateFormData>,
) {
  if (error instanceof ZodError) {
    handleZodErrors(error, setError, setFocus);
  } else if (error instanceof Error) {
    handleApiErrors(error as ApiError, setError, setFocus);
  } else {
    showToast.error("알 수 없는 오류가 발생했습니다.");
  }
}

function handleZodErrors(
  error: ZodError,
  setError: UseFormSetError<ProductUpdateFormData>,
  setFocus: UseFormSetFocus<ProductUpdateFormData>,
) {
  const firstErrorField = error.errors[0]
    ?.path[0] as keyof ProductUpdateFormData;

  error.errors.forEach(({ path, message }) => {
    const fieldPath = path.join(".");

    if (fieldPath.includes("categoryFields.")) {
      const categoryField = fieldPath.split(".")[1];
      setError(
        `categoryFields.${categoryField}` as keyof ProductUpdateFormData,
        {
          type: "manual",
          message,
        },
      );
    } else {
      setError(fieldPath as keyof ProductUpdateFormData, {
        type: "manual",
        message,
      });
    }
  });

  if (firstErrorField) {
    setFocus(firstErrorField);
  }

  showToast.error("입력한 정보를 다시 확인해주세요.");
}

function handleApiErrors(
  error: ApiError,
  setError: UseFormSetError<ProductUpdateFormData>,
  setFocus: UseFormSetFocus<ProductUpdateFormData>,
) {
  const errorData = error.response?.data;
  const status = error.response?.status;

  if (status === 400) {
    if (errorData?.errors && Array.isArray(errorData.errors)) {
      const firstErrorField = errorData.errors[0]
        ?.field as keyof ProductUpdateFormData;

      errorData.errors.forEach(({ field, message }) => {
        if (field.includes("categoryFields.") || field.includes(".")) {
          setError(field as keyof ProductUpdateFormData, {
            type: "manual",
            message,
          });
        } else {
          setError(field as keyof ProductUpdateFormData, {
            type: "manual",
            message,
          });
        }
      });

      if (firstErrorField) {
        setFocus(firstErrorField);
      }

      showToast.error("입력한 정보를 다시 확인해주세요.");
      return;
    }

    if (errorData?.field && errorData?.message) {
      const field = errorData.field as keyof ProductUpdateFormData;
      setError(field, {
        type: "manual",
        message: errorData.message,
      });
      setFocus(field);
      showToast.error(errorData.message);
      return;
    }
  }

  if (status === 409) {
    setError("name", {
      type: "manual",
      message: "이미 존재하는 제품명입니다.",
    });
    setFocus("name");
    showToast.error("이미 존재하는 제품명입니다.");
    return;
  }

  if (status === 413) {
    showToast.error("파일 크기가 너무 큽니다. 10MB 이하로 업로드해주세요.");
    return;
  }

  if (status === 422) {
    showToast.error("지원하지 않는 파일 형식입니다.");
    return;
  }

  if (status === 500) {
    showToast.error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    return;
  }

  const message = errorData?.message || errorData?.error || error.message;
  showToast.error(message || "제품 수정 중 오류가 발생했습니다.");
}

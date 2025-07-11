import { UseFormSetError, UseFormSetFocus } from "react-hook-form";
import { ZodError } from "zod";
import { ProductFormData } from "../_types/product.type";
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

export function handleFormErrors(
  error: unknown,
  setError: UseFormSetError<ProductFormData>,
  setFocus: UseFormSetFocus<ProductFormData>,
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
  setError: UseFormSetError<ProductFormData>,
  setFocus: UseFormSetFocus<ProductFormData>,
) {
  let firstErrorField: string | null = null;

  error.errors.forEach((err, index) => {
    const fieldPath = err.path.join(".");

    if (fieldPath.startsWith("categoryFields.")) {
      const categoryFieldName = fieldPath.replace("categoryFields.", "");
      const fieldName =
        `categoryFields.${categoryFieldName}` as `categoryFields.${string}`;

      setError(fieldName, {
        type: "validation",
        message: err.message,
      });

      if (index === 0) firstErrorField = fieldName;
    } else {
      setError(fieldPath as keyof ProductFormData, {
        type: "validation",
        message: err.message,
      });

      if (index === 0) firstErrorField = fieldPath;
    }
  });

  if (firstErrorField) {
    focusOrScrollToField(firstErrorField as keyof ProductFormData, setFocus);
  }
}

function handleApiErrors(
  error: ApiError,
  setError: UseFormSetError<ProductFormData>,
  setFocus: UseFormSetFocus<ProductFormData>,
) {
  if (!error.response) {
    showToast.error(`오류: ${error.message}`);
    return;
  }

  const errorData = error.response.data;

  let firstErrorField: string | null = null;

  if (errorData?.errors && Array.isArray(errorData.errors)) {
    errorData.errors.forEach((err, index) => {
      const fieldName = setFieldError(err.field, err.message, setError);
      if (index === 0) firstErrorField = fieldName;
    });
  } else if (errorData?.field && errorData?.message) {
    firstErrorField = setFieldError(
      errorData.field,
      errorData.message,
      setError,
    );
  } else {
    const message = errorData?.error || errorData?.message || error.message;
    showToast.error(`오류: ${message}`);
    return;
  }

  if (firstErrorField) {
    focusOrScrollToField(firstErrorField as keyof ProductFormData, setFocus);
  }
}

function setFieldError(
  field: string,
  message: string,
  setError: UseFormSetError<ProductFormData>,
): string {
  if (field.startsWith("categoryFields.")) {
    const categoryFieldName = field.replace("categoryFields.", "");
    const fieldName =
      `categoryFields.${categoryFieldName}` as `categoryFields.${string}`;

    setError(fieldName, {
      type: "validation",
      message,
    });

    return fieldName;
  } else {
    setError(field as keyof ProductFormData, {
      type: "validation",
      message,
    });

    return field;
  }
}

function focusOrScrollToField(
  fieldName: keyof ProductFormData,
  setFocus: UseFormSetFocus<ProductFormData>,
) {
  scrollToField(fieldName);
  setFocus(fieldName);
}

function scrollToField(fieldName: keyof ProductFormData) {
  const element =
    document.querySelector(`[name="${fieldName}"]`) ||
    document.querySelector(`input[name="${fieldName}"]`) ||
    document.querySelector(`select[name="${fieldName}"]`) ||
    document.querySelector(`textarea[name="${fieldName}"]`) ||
    document.querySelector(`[data-field="${fieldName}"]`);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    const targetElement =
      element.querySelector('[data-slot="select-trigger"]') || element;
    targetElement.classList.add("ring-2", "ring-red-500");
    targetElement.classList.remove("ring-2", "ring-red-500");
  } else {
    console.warn(`Could not find element for field: ${fieldName}`);
  }
}

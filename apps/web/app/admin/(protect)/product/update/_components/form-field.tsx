import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";
import { ReactNode } from "react";
import { ProductUpdateFormData } from "../_types/product-update.type";

interface FormFieldProps<TName extends FieldPath<ProductUpdateFormData>> {
  name: TName;
  control: Control<ProductUpdateFormData>;
  label: string;
  required?: boolean;
  className?: string;
  children: (props: {
    field: {
      onChange: (value: FieldValues[TName]) => void;
      onBlur: () => void;
      value: FieldValues[TName];
      name: TName;
    };
    fieldState: {
      invalid: boolean;
      isTouched: boolean;
      isDirty: boolean;
      error?: { message?: string };
    };
  }) => ReactNode;
}

export function FormField<TName extends FieldPath<ProductUpdateFormData>>({
  name,
  control,
  label,
  required = false,
  className = "flex w-full flex-col gap-2",
  children,
}: FormFieldProps<TName>) {
  return (
    <div className={className}>
      <label className="text-gray400 font-semibold">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            {children({ field, fieldState })}
            {fieldState.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
}

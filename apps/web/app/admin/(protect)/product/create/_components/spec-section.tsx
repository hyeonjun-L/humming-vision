import { Controller, Control, useController, FieldPath } from "react-hook-form";
import ImageUpload from "components/image-upload/image-upload";
import { ProductFormData } from "../_types/product.type";

interface SpecSectionProps {
  control: Control<ProductFormData>;
}

export const SpecSection = ({ control }: SpecSectionProps) => {
  const fieldName = "specImages" as FieldPath<ProductFormData>;

  const { fieldState: nameFieldState } = useController({
    control,
    name: fieldName,
  });

  return (
    <section className="border-gray200 mb-3.5 flex flex-col gap-10 border p-[30px]">
      <h3 className="text-gray600 text-xl font-semibold">상세스펙</h3>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <ImageUpload
            images={(field.value as File[]) || []}
            onImagesChange={field.onChange}
          />
        )}
      />
      {nameFieldState.error && (
        <span className="text-sm text-red-500">
          {nameFieldState.error.message}
        </span>
      )}
    </section>
  );
};

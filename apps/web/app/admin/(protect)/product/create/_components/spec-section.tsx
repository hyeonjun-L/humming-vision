import { Controller, Control } from "react-hook-form";
import ImageUpload from "components/image-upload/image-upload";
import { ProductFormData } from "../_const/constants";

interface SpecSectionProps {
  control: Control<ProductFormData>;
}

export const SpecSection = ({ control }: SpecSectionProps) => {
  return (
    <section className="border-gray200 mb-3.5 flex flex-col gap-10 border p-[30px]">
      <h3 className="text-gray600 text-xl font-semibold">상세스펙</h3>
      <Controller
        name="specImages"
        control={control}
        render={({ field }) => (
          <ImageUpload images={field.value} onImagesChange={field.onChange} />
        )}
      />
    </section>
  );
};

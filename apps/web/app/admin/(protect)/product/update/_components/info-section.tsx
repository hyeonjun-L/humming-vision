import { Control } from "react-hook-form";
import { CategoriesEnum } from "@humming-vision/shared";
import { ProductUpdateFormData } from "../_types/product-update.type";
import { infoSectionFields } from "../_const/constants";
import {
  TextInput,
  ImageUploadInput,
  PdfUploadInput,
} from "../../_components/shared-form-inputs";

interface InfoSectionProps {
  control: Control<ProductUpdateFormData>;
  selectedCategory: CategoriesEnum;
}

export const InfoSection = ({
  control,
  selectedCategory,
}: InfoSectionProps) => {
  const fields = infoSectionFields[selectedCategory];

  return (
    <section className="border-gray200 mb-3.5 flex flex-col gap-10 border p-[30px]">
      <h3 className="text-gray600 text-xl font-semibold">정보</h3>

      {fields.name && (
        <TextInput
          name="name"
          control={control}
          label="제품명"
          placeholder="제품명 입력"
        />
      )}

      {fields.productImages && (
        <ImageUploadInput
          name="productImages"
          control={control}
          label="이미지"
          maxImages={10}
        />
      )}

      {fields.catalogFile && (
        <PdfUploadInput
          name="catalogFile"
          control={control}
          label="카탈로그 (PDF)"
        />
      )}

      {fields.datasheetFile && (
        <PdfUploadInput
          name="datasheetFile"
          control={control}
          label="Datasheet (PDF)"
        />
      )}

      {fields.drawingFile && (
        <PdfUploadInput
          name="drawingFile"
          control={control}
          label="Drawing (PDF)"
        />
      )}

      {fields.manualFile && (
        <PdfUploadInput
          name="manualFile"
          control={control}
          label="Manual (PDF)"
        />
      )}
    </section>
  );
};

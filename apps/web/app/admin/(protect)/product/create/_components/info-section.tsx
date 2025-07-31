import { Control } from "react-hook-form";
import { CategoriesEnum } from "@humming-vision/shared";
import { ProductFormData } from "../_types/product.type";
import { infoSectionFields } from "../_const/constants";
import {
  TextInput,
  TextAreaInput,
  ImageUploadInput,
  FileUploadInput,
} from "../../_components/shared-form-inputs";

interface InfoSectionProps {
  control: Control<ProductFormData>;
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

      {fields.mainFeature && (
        <TextAreaInput
          name="mainFeature"
          control={control}
          label="주요특징"
          placeholder="주요특징 입력"
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
        <FileUploadInput
          name="catalogFile"
          control={control}
          label="카탈로그 (PDF)"
        />
      )}

      {fields.datasheetFile && (
        <FileUploadInput
          name="datasheetFile"
          control={control}
          label="Datasheet (PDF)"
        />
      )}

      {fields.drawingFile && (
        <FileUploadInput
          name="drawingFile"
          control={control}
          label="Drawing (PDF)"
          accept={[".pdf", ".dwg", ".stp"]}
        />
      )}

      {fields.manualFile && (
        <FileUploadInput
          name="manualFile"
          control={control}
          label="Manual (PDF)"
        />
      )}
    </section>
  );
};

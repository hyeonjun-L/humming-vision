import { Control } from "react-hook-form";
import { ProductFormData } from "../_types/product.type";
import {
  TextInput,
  TextAreaInput,
  ImageUploadInput,
  PdfUploadInput,
} from "./form-inputs";

interface InfoSectionProps {
  control: Control<ProductFormData>;
}

export const InfoSection = ({ control }: InfoSectionProps) => {
  return (
    <section className="border-gray200 mb-3.5 flex flex-col gap-10 border p-[30px]">
      <h3 className="text-gray600 text-xl font-semibold">정보</h3>

      <TextInput
        name="name"
        control={control}
        label="제품명"
        placeholder="제품명 입력"
        required
      />

      <TextAreaInput
        name="mainFeature"
        control={control}
        label="주요특징"
        placeholder="주요특징 입력"
      />

      <ImageUploadInput
        name="productImages"
        control={control}
        label="이미지"
        maxImages={10}
      />

      <PdfUploadInput
        name="datasheetFile"
        control={control}
        label="Datasheet (PDF)"
      />

      <PdfUploadInput
        name="drawingFile"
        control={control}
        label="Drawing (PDF)"
      />

      <PdfUploadInput
        name="manualFile"
        control={control}
        label="Manual (PDF)"
      />
    </section>
  );
};

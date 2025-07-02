import { Controller, Control } from "react-hook-form";
import { Input } from "components/input";
import ImageUpload from "components/image-upload/image-upload";
import PdfUpload from "components/pdf-upload";
import { ProductFormData } from "../_const/constants";

interface InfoSectionProps {
  control: Control<ProductFormData>;
}

export const InfoSection = ({ control }: InfoSectionProps) => {
  return (
    <section className="border-gray200 mb-3.5 flex flex-col gap-10 border p-[30px]">
      <h3 className="text-gray600 text-xl font-semibold">정보</h3>

      <div className="flex w-full flex-col gap-2">
        <label className="text-gray400 font-semibold">제품명</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              size="default"
              placeholder="제품명 입력"
              className="text-gray600 focus-visible:border-gray200 rounded-none border-x-0 border-t-0 border-b text-base outline-none placeholder:text-sm focus-visible:ring-0"
            />
          )}
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <label className="text-gray400 font-semibold">주요특징</label>
        <Controller
          name="mainFeature"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="주요특징 입력"
              className="text-gray600 placeholder:text-gray300 field-sizing-content max-h-[11.25rem] resize-none rounded-none border-x-0 border-t-0 border-b px-3 py-1 outline-none placeholder:text-sm focus-visible:ring-0"
            />
          )}
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <label className="text-gray400 font-semibold">제조사</label>
        <Controller
          name="manufacturer"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              size="default"
              placeholder="제조사 입력"
              className="text-gray600 focus-visible:border-gray200 rounded-none border-x-0 border-t-0 border-b text-base outline-none placeholder:text-sm focus-visible:ring-0"
            />
          )}
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <label className="text-gray400 font-semibold">이미지</label>
        <Controller
          name="productImages"
          control={control}
          render={({ field }) => (
            <ImageUpload
              images={field.value}
              onImagesChange={field.onChange}
              maxImages={10}
            />
          )}
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <label className="text-gray400 font-semibold">Datasheet (PDF)</label>
        <Controller
          name="datasheetFile"
          control={control}
          render={({ field }) => (
            <PdfUpload file={field.value} onFileChange={field.onChange} />
          )}
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <label className="text-gray400 font-semibold">Drawing (PDF)</label>
        <Controller
          name="drawingFile"
          control={control}
          render={({ field }) => (
            <PdfUpload file={field.value} onFileChange={field.onChange} />
          )}
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <label className="text-gray400 font-semibold">Manual (PDF)</label>
        <Controller
          name="manualFile"
          control={control}
          render={({ field }) => (
            <PdfUpload file={field.value} onFileChange={field.onChange} />
          )}
        />
      </div>
    </section>
  );
};

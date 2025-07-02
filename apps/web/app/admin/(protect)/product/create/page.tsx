"use client";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { ZodError } from "zod";
import { CategoriesEnum } from "@humming-vision/shared";
import { ProductFormData } from "./_const/constants";
import {
  getFormSchema,
  createCompleteProductDto,
} from "./_schemas/product.schema";
import { CategorySection } from "./_components/category-section";
import { InfoSection } from "./_components/info-section";
import { SpecSection } from "./_components/spec-section";
import { OtherInfoSection } from "./_components/other-info-section";

function CreateProductPage() {
  const { control, handleSubmit, watch } = useForm<ProductFormData>({
    defaultValues: {
      category: CategoriesEnum.CAMERA,
      name: "",
      mainFeature: "",
      manufacturer: "",
      productImages: [],
      specImages: [],
      datasheetFile: null,
      drawingFile: null,
      manualFile: null,
      categoryFields: {},
    },
  });

  const selectedCategory = watch("category");

  const onSubmit = (data: ProductFormData) => {
    console.log("Original form data:", data);

    try {
      const schema = getFormSchema(data.category);

      const validatedData = schema.parse(data);
      console.log("Validated form data:", validatedData);

      const transformedData = createCompleteProductDto(data);
      console.log("Transformed DTO:", transformedData);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors
          .map((err) => {
            const path = err.path.join(".");
            return `${path}: ${err.message}`;
          })
          .join("\n");
        alert(`검증 오류:\n${errorMessages}`);
      } else if (error instanceof Error) {
        alert(`오류: ${error.message}`);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-60 md:px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <hr className="border-gray200 absolute left-0 w-screen border-t" />
        <div className="border-main mb-5 border-b py-5.5 sm:gap-0">
          <h2 className="text-main text-2xl font-bold">제품등록</h2>
        </div>

        <CategorySection
          control={control}
          selectedCategory={selectedCategory}
        />
        <InfoSection control={control} />
        <SpecSection control={control} />
        <OtherInfoSection
          control={control}
          selectedCategory={selectedCategory}
        />

        <button
          type="submit"
          className="group border-gray300 ml-auto flex w-64 border-b py-2.5 transition-colors"
        >
          <div className="text-gray300 flex w-full items-center justify-end gap-5 text-xl font-normal group-hover:font-semibold">
            등록하기
            <div className="border-gray300 group-hover:bg-gray100 flex size-9 items-center justify-center rounded-full border bg-white">
              <ArrowRight className="text-gray300" />
            </div>
          </div>
        </button>
      </form>
    </main>
  );
}

export default CreateProductPage;

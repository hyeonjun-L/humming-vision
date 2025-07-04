"use client";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { ZodError } from "zod";
import {
  CategoriesEnum,
  CategoryRelationMapKebab,
} from "@humming-vision/shared";
import {
  getFormSchema,
  createCompleteProductDto,
} from "./_schemas/product.schema";
import { CategorySection } from "./_components/category-section";
import { InfoSection } from "./_components/info-section";
import { SpecSection } from "./_components/spec-section";
import { OtherInfoSection } from "./_components/other-info-section";
import { ProductFormData } from "./_types/product.type";
import { protectApi } from "libs/axios";

function CreateProductPage() {
  const { control, handleSubmit, watch, setError, clearErrors } =
    useForm<ProductFormData>({
      defaultValues: {
        category: CategoriesEnum.CAMERA,
        name: "", //TODO: 이름 중복 에러처리 & subCategory 기본 값확인 & 조명 등록 컴포넌트 재조정 & 소프트웨어 제조사 제거
        mainFeature: "",
        productImages: [],
        specImages: [],
        datasheetFile: undefined, //TODO: Update 진행 시 수정
        drawingFile: undefined,
        manualFile: undefined,
        categoryFields: {},
      },
    });

  const selectedCategory = watch("category");

  const uploadedImages = async (images: File[]): Promise<string[]> => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("files", image);
      });

      const request = await protectApi.post<string[]>(
        "/api/uploads/images",
        formData,
      );

      return request.data.map((url: string) => url);
    } catch (error) {
      if (error instanceof Error) {
        alert(`이미지 업로드 오류: ${error.message}`);
      }
      return [];
    }
  };

  const uploadDocument = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const request = await protectApi.post("/api/uploads/documents", formData);

      return request.data.url;
    } catch (error) {
      if (error instanceof Error) {
        alert(`문서 업로드 오류: ${error.message}`);
      }
      return null;
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    clearErrors();

    try {
      const schema = getFormSchema(data.category);

      const validatedData = schema.parse(data);

      const productImageUrls = await uploadedImages(
        validatedData.productImages,
      );
      const specImageUrls = await uploadedImages(validatedData.specImages);

      const datasheetUrl = validatedData.datasheetFile
        ? await uploadDocument(validatedData.datasheetFile)
        : null;
      const drawingUrl = validatedData.drawingFile
        ? await uploadDocument(validatedData.drawingFile)
        : null;
      const manualUrl = validatedData.manualFile
        ? await uploadDocument(validatedData.manualFile)
        : null;

      const dataWithUrls = {
        ...data,
        productImages: productImageUrls,
        specImages: specImageUrls,
        datasheetFile: datasheetUrl,
        drawingFile: drawingUrl,
        manualFile: manualUrl,
      };

      const transformedData = createCompleteProductDto(dataWithUrls);

      const request = await protectApi.post(
        `/api/product/create/${CategoryRelationMapKebab[data.category]}`,
        transformedData,
      );

      console.log("Product created successfully:", request.data);
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((err) => {
          const fieldPath = err.path.join(".");

          if (fieldPath.startsWith("categoryFields.")) {
            const categoryFieldName = fieldPath.replace("categoryFields.", "");
            setError(
              `categoryFields.${categoryFieldName}` as `categoryFields.${string}`,
              {
                type: "validation",
                message: err.message,
              },
            );
          } else {
            setError(fieldPath as keyof ProductFormData, {
              type: "validation",
              message: err.message,
            });
          }
        });
      } else if (error instanceof Error) {
        console.error("Submission error:", error);
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

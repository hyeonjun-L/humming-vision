"use client";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import {
  CategoriesEnum,
  CategoryRelationMapKebab,
} from "@humming-vision/shared";
import {
  getFormSchema,
  createCompleteProductDto,
} from "./_schemas/product.schema";
import { sectionVisibility } from "./_const/constants";
import { CategorySection } from "./_components/category-section";
import { InfoSection } from "./_components/info-section";
import { SpecSection } from "./_components/spec-section";
import { OtherInfoSection } from "./_components/other-info-section";
import {
  ProductFormData,
  isLightProduct,
  ProductApiData,
} from "./_types/product.type";
import { protectApi } from "libs/axios";
import { handleFormErrors } from "./_utils/form-error-handler";

function CreateProductPage() {
  const { control, handleSubmit, watch, setError, setFocus, clearErrors } =
    useForm<ProductFormData>({
      defaultValues: {
        category: CategoriesEnum.CAMERA,
        name: "",
        mainFeature: "",
        productImages: [],
        specImages: [],
        datasheetFile: undefined,
        drawingFile: undefined,
        manualFile: undefined,
        catalogFile: undefined,
        categoryFields: {},
      } as Partial<ProductFormData>,
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

      let transformedData;

      if (isLightProduct(data)) {
        const lightData = validatedData as {
          name: string;
          category: CategoriesEnum.LIGHT;
          catalogFile: File;
        };
        const catalogUrl = await uploadDocument(lightData.catalogFile);

        transformedData = createCompleteProductDto({
          ...data,
          catalogFile: catalogUrl,
        } as ProductApiData);
      } else {
        const standardData = validatedData as {
          name: string;
          category: CategoriesEnum;
          subCategory: string;
          mainFeature: string;
          productImages: File[];
          specImages: File[];
          datasheetFile?: File;
          drawingFile?: File;
          manualFile?: File;
          categoryFields: Record<string, string>;
        };

        const productImageUrls = await uploadedImages(
          standardData.productImages,
        );
        const specImageUrls = await uploadedImages(standardData.specImages);

        const datasheetUrl = standardData.datasheetFile
          ? await uploadDocument(standardData.datasheetFile)
          : null;
        const drawingUrl = standardData.drawingFile
          ? await uploadDocument(standardData.drawingFile)
          : null;
        const manualUrl = standardData.manualFile
          ? await uploadDocument(standardData.manualFile)
          : null;

        const dataWithUrls = {
          ...data,
          productImages: productImageUrls,
          specImages: specImageUrls,
          datasheetFile: datasheetUrl,
          drawingFile: drawingUrl,
          manualFile: manualUrl,
        } as ProductApiData; // API 데이터 타입으로 변환

        transformedData = createCompleteProductDto(dataWithUrls);
      }

      const request = await protectApi.post(
        `/api/product/create/${CategoryRelationMapKebab[data.category]}`,
        transformedData,
      );

      console.log("Product created successfully:", request.data);
    } catch (error) {
      handleFormErrors(error, setError, setFocus);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-60 md:px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <hr className="border-gray200 absolute left-0 w-screen border-t" />
        <div className="border-main mb-5 border-b py-5.5 sm:gap-0">
          <h2 className="text-main text-2xl font-bold">제품등록</h2>
        </div>

        {sectionVisibility[selectedCategory].categorySection && (
          <CategorySection
            control={control}
            selectedCategory={selectedCategory}
          />
        )}

        <InfoSection control={control} selectedCategory={selectedCategory} />

        {sectionVisibility[selectedCategory].specSection && (
          <SpecSection control={control} />
        )}

        {sectionVisibility[selectedCategory].otherInfoSection && (
          <OtherInfoSection
            control={control}
            selectedCategory={selectedCategory}
          />
        )}

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

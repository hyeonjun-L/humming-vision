"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
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
  ValidatedLightProductData,
  ValidatedStandardProductData,
} from "./_types/product.type";
import { protectApi } from "libs/axios";
import { handleFormErrors } from "./_utils/form-error-handler";
import { useMutation } from "@tanstack/react-query";

function CreateProductPage() {
  const [formKey, setFormKey] = useState(0);

  const {
    control,
    handleSubmit,
    watch,
    setError,
    setFocus,
    clearErrors,
    reset,
  } = useForm<ProductFormData>({
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

  const createCompleteProduct = async (data: ProductFormData) => {
    const uploadImages = async (images: File[]): Promise<string[]> => {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("files", image);
      });
      const response = await protectApi.post<string[]>(
        "/api/uploads/images",
        formData,
      );
      return response.data.map((url: string) => url);
    };

    const uploadDocument = async (file: File): Promise<string> => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await protectApi.post(
        "/api/uploads/documents",
        formData,
      );
      return response.data.url;
    };

    const schema = getFormSchema(data.category);
    const validatedData = schema.parse(data);

    let transformedData;

    if (isLightProduct(data)) {
      const lightData = validatedData as ValidatedLightProductData;
      const catalogUrl = await uploadDocument(lightData.catalogFile);

      transformedData = createCompleteProductDto({
        ...data,
        catalogFile: catalogUrl,
      } as ProductApiData);
    } else {
      const standardData = validatedData as ValidatedStandardProductData;

      const [
        productImageUrls,
        specImageUrls,
        datasheetUrl,
        drawingUrl,
        manualUrl,
      ] = await Promise.all([
        uploadImages(standardData.productImages),
        uploadImages(standardData.specImages),
        standardData.datasheetFile
          ? uploadDocument(standardData.datasheetFile)
          : Promise.resolve(null),
        standardData.drawingFile
          ? uploadDocument(standardData.drawingFile)
          : Promise.resolve(null),
        standardData.manualFile
          ? uploadDocument(standardData.manualFile)
          : Promise.resolve(null),
      ]);

      const dataWithUrls = {
        ...data,
        productImages: productImageUrls,
        specImages: specImageUrls,
        datasheetFile: datasheetUrl,
        drawingFile: drawingUrl,
        manualFile: manualUrl,
      } as ProductApiData;

      transformedData = createCompleteProductDto(dataWithUrls);
    }

    const response = await protectApi.post(
      `/api/product/create/${CategoryRelationMapKebab[data.category]}`,
      transformedData,
    );

    return response.data;
  };

  const createProductMutation = useMutation({
    mutationFn: createCompleteProduct,
    onSuccess: () => {
      reset({
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
      } as Partial<ProductFormData>);

      setFormKey((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      alert("제품이 성공적으로 등록되었습니다!");
    },
    onError: (error: unknown) => {
      handleFormErrors(error, setError, setFocus);
    },
  });

  const onSubmit = (data: ProductFormData) => {
    clearErrors();
    createProductMutation.mutate(data);
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-60 md:px-10">
      <form key={formKey} onSubmit={handleSubmit(onSubmit)}>
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
          disabled={createProductMutation.isPending}
          className="group border-gray300 ml-auto flex w-64 border-b py-2.5 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="text-gray300 flex w-full items-center justify-end gap-5 text-xl font-normal group-hover:font-semibold">
            {createProductMutation.isPending ? "등록 중..." : "등록하기"}
            <div className="border-gray300 group-hover:bg-gray100 flex size-9 items-center justify-center rounded-full border bg-white">
              {createProductMutation.isPending ? (
                <Loader2 className="text-gray300 h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="text-gray300" />
              )}
            </div>
          </div>
        </button>
      </form>
    </main>
  );
}

export default CreateProductPage;

"use client";
import { useState } from "react";
import {
  CategoriesEnum,
  CategoryRelationMapKebab,
} from "@humming-vision/shared";
import { sectionVisibility } from "./_const/constants";
import { CategorySection } from "./_components/category-section";
import { InfoSection } from "./_components/info-section";
import { SpecSection } from "./_components/spec-section";
import { OtherInfoSection } from "./_components/other-info-section";
import { ProductFormData } from "./_types/product.type";
import { protectApi } from "libs/axios";
import { handleFormErrors } from "./_utils/form-error-handler";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "utils/toast-config";
import { useProductForm } from "../_hooks/useProductForm";
import { createUploadService } from "../_utils/uploadService";
import { createProductApiProcessor } from "../_utils/productApiProcessor";
import { ProductFormLayout, SubmitButton } from "../_components/shared-ui";

function CreateProductPage() {
  const [formKey, setFormKey] = useState(0);

  const {
    control,
    handleSubmit,
    setError,
    setFocus,
    clearErrors,
    reset,
    watchedValues,
  } = useProductForm<ProductFormData>({
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

  const selectedCategory = watchedValues.category || CategoriesEnum.CAMERA;

  const uploadService = createUploadService();

  const createCompleteProduct = async (data: ProductFormData) => {
    const apiProcessor = createProductApiProcessor(
      uploadService,
      { category: data.category },
      false,
    );

    const transformedData = await apiProcessor.processData(data);

    const response = await protectApi.post(
      `/api/product/create/${CategoryRelationMapKebab[data.category]}`,
      transformedData,
    );

    return response.data;
  };

  const createProductMutation = useMutation({
    mutationFn: createCompleteProduct,
    onSuccess: () => {
      const currentCategory = watchedValues.category || CategoriesEnum.CAMERA;

      reset({
        category: currentCategory,
        name: "",
        mainFeature: "",
        productImages: [],
        specImages: [],
        datasheetFile: undefined,
        drawingFile: undefined,
        manualFile: undefined,
        catalogFile: undefined,
        categoryFields: {},
      });

      setFormKey((prev) => prev + 1);

      window.scrollTo({ top: 0, behavior: "smooth" });

      showToast.success("제품이 성공적으로 등록되었습니다.");
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
    <ProductFormLayout title="제품등록">
      <form key={formKey} onSubmit={handleSubmit(onSubmit)}>
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

        <SubmitButton
          isSubmitting={createProductMutation.isPending}
          text="등록하기"
          loadingText="등록 중..."
        />
      </form>
    </ProductFormLayout>
  );
}

export default CreateProductPage;

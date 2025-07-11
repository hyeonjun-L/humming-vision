"use client";

import React, { useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CategoriesEnum,
  CategoryRelationMapKebab,
} from "@humming-vision/shared";
import {
  ProductUpdateFormData,
  StandardProductUpdateApiData,
  LightProductUpdateApiData,
} from "../_types/product-update.type";
import { useProductForm } from "../../_hooks/useProductForm";
import { createUploadService } from "../../_utils/uploadService";
import { createProductApiProcessor } from "../../_utils/productApiProcessor";
import {
  LoadingState,
  ErrorState,
  ProductFormLayout,
  SubmitButton,
} from "../../_components/shared-ui";
import { CategorySection } from "./category-section";
import { InfoSection } from "./info-section";
import { urlToFile, urlsToFiles } from "../_utils/file-converter";
import { sectionVisibility } from "../_const/constants";
import { SpecSection } from "./spec-section";
import { OtherInfoSection } from "./other-info-section";
import { protectApi } from "libs/axios";
import { showToast } from "utils/toast-config";
import { useRouter } from "next/navigation";
import { getUpdateFormSchema } from "../_schemas/product-update.schema";
import { handleUpdateFormErrors } from "../_utils/form-error-handler";

interface UpdateProductPageProps {
  productId: number;
  categoryId: number;
  category: CategoriesEnum;
  initialData: ProductUpdateFormData;
}

function UpdateProductPage({
  productId,
  categoryId,
  initialData,
  category: selectedCategory,
}: UpdateProductPageProps) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    data: convertedFormData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["convertUrlsToFiles", initialData],
    queryFn: () => convertUrlsToFiles(initialData),
    staleTime: 5 * 60 * 1000,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const formSchema = useMemo(
    () => getUpdateFormSchema(selectedCategory),
    [selectedCategory],
  );

  const {
    control,
    handleSubmit,
    setError,
    setFocus,
    clearErrors,
    reset,
    formState: { isSubmitting },
    getChangedFields,
    hasChanges,
  } = useProductForm<ProductUpdateFormData>(convertedFormData || initialData);

  const uploadService = createUploadService();

  const hasFormChanges = hasChanges(convertedFormData);

  useEffect(() => {
    if (convertedFormData) {
      reset(convertedFormData, {
        keepDirty: false,
        keepTouched: false,
        keepDefaultValues: true,
      });
    }
  }, [convertedFormData, reset]);

  const convertUrlsToFiles = async (
    data: ProductUpdateFormData,
  ): Promise<ProductUpdateFormData> => {
    try {
      const convertedData = { ...data };

      if (data.productImageUrls && data.productImageUrls.length > 0) {
        try {
          const productFiles = await urlsToFiles(data.productImageUrls);
          convertedData.productImages = productFiles;
        } catch (error) {
          showToast.error("Failed to load product images.");
          console.warn("Failed to load product images:", error);
          convertedData.productImages = [];
        }
      }

      if (data.specImageUrls && data.specImageUrls.length > 0) {
        try {
          const specFiles = await urlsToFiles(data.specImageUrls);
          convertedData.specImages = specFiles;
        } catch (error) {
          showToast.error("Failed to load spec images.");
          console.warn("Failed to load spec images:", error);
          convertedData.specImages = [];
        }
      }

      const fileConverters = [
        { url: data.datasheetUrl, field: "datasheetFile" as const },
        { url: data.drawingUrl, field: "drawingFile" as const },
        { url: data.manualUrl, field: "manualFile" as const },
        { url: data.catalogFileUrl, field: "catalogFile" as const },
      ];

      await Promise.all(
        fileConverters.map(async ({ url, field }) => {
          if (url) {
            try {
              const file = await urlToFile(url);
              convertedData[field] = file;
            } catch (error) {
              console.warn(`Failed to load ${field}:`, error);
              convertedData[field] = undefined;
            }
          }
        }),
      );

      return convertedData;
    } catch (error) {
      console.error("Error converting URLs to files:", error);
      throw error;
    }
  };

  const updateCompleteProduct = async (
    data: ProductUpdateFormData,
  ): Promise<void> => {
    formSchema.parse(data);

    const changedFields = getChangedFields(convertedFormData);

    const apiProcessor = createProductApiProcessor(
      uploadService,
      {
        id: productId,
      },
      true,
    );

    const transformedData = await apiProcessor.processData(data, changedFields);

    if (selectedCategory === CategoriesEnum.LIGHT) {
      const lightData = transformedData as LightProductUpdateApiData;
      if (changedFields.categoryFields) {
        lightData.light = {
          id: categoryId,
          ...changedFields.categoryFields,
        };
      }

      await protectApi.patch(
        `/api/product/update/${productId}?category=${data.category}`,
        lightData,
      );
    } else {
      const standardData = transformedData as StandardProductUpdateApiData;
      if (changedFields.categoryFields) {
        const categoryKey = CategoryRelationMapKebab[data.category].replace(
          "-",
          "",
        ) as keyof Pick<
          StandardProductUpdateApiData,
          "camera" | "frameGrabber" | "lens" | "software"
        >;

        standardData[categoryKey] = {
          id: categoryId,
          ...changedFields.categoryFields,
        };
      }

      await protectApi.patch(
        `/api/product/update/${productId}?category=${data.category}`,
        standardData,
      );
    }
  };

  const updateProductMutation = useMutation({
    mutationFn: updateCompleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      showToast.success("제품이 성공적으로 수정되었습니다.", {
        autoClose: 1500,
        onClose: () => {
          router.back();
        },
      });
    },
    onError: (error: unknown) => {
      handleUpdateFormErrors(error, setError, setFocus);
    },
  });

  const onSubmit = (data: ProductUpdateFormData) => {
    clearErrors();
    updateProductMutation.mutate(data);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={() => refetch()}
        onSkip={() => reset(initialData)}
      />
    );
  }

  return (
    <ProductFormLayout title="제품수정">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CategorySection selectedCategory={selectedCategory} />

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
          isSubmitting={isSubmitting}
          disabled={!hasFormChanges}
          text="수정하기"
        />
      </form>
    </ProductFormLayout>
  );
}

export default UpdateProductPage;

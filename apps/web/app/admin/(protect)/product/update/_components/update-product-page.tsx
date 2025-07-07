"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CategoriesEnum,
  CategoryRelationMapKebab,
  Product,
} from "@humming-vision/shared";
import { ProductUpdateFormData } from "../_types/product-update.type";
import { useForm } from "react-hook-form";
import { CategorySection } from "./category-section";
import { InfoSection } from "./info-section";
import { urlToFile, urlsToFiles } from "../_utils/file-converter";
import { sectionVisibility } from "../_const/constants";
import { SpecSection } from "./spec-section";
import { OtherInfoSection } from "./other-info-section";
import { ArrowRight, Loader2 } from "lucide-react";
import { protectApi } from "libs/axios";

// Product에서 각 카테고리의 id와 제품 id를 제외한 나머지를 옵셔널로 만든 타입
type PartialProductUpdate = {
  // 기본 필드들을 옵셔널로 설정
  categories?: CategoriesEnum;
  name?: string;
  mainFeature?: string;
  datasheetUrl?: string | null;
  drawingUrl?: string | null;
  manualUrl?: string | null;
  images?: Array<{
    type: string;
    path: string;
    order?: number;
  }>;

  // 각 카테고리별 관련 데이터에서 id와 product 참조 제거
  camera?: Omit<NonNullable<Product["camera"]>, "id" | "product">;
  frameGrabber?: Omit<NonNullable<Product["frameGrabber"]>, "id" | "product">;
  lens?: Omit<NonNullable<Product["lens"]>, "id" | "product">;
  light?: Omit<NonNullable<Product["light"]>, "id" | "product">;
  software?: Omit<NonNullable<Product["software"]>, "id" | "product">;
};

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

  const {
    control,
    handleSubmit,
    reset,
    formState: { dirtyFields, isSubmitting },
    getValues,
    watch,
  } = useForm<ProductUpdateFormData>({
    defaultValues: convertedFormData || initialData,
  });

  const watchedValues = watch();

  const getChangedFields = useCallback((): Partial<ProductUpdateFormData> => {
    const currentValues = getValues();
    const changedData: Partial<ProductUpdateFormData> = {};

    Object.keys(dirtyFields).forEach((key) => {
      const fieldKey = key as keyof ProductUpdateFormData;
      if (dirtyFields[fieldKey]) {
        if (fieldKey === "categoryFields" && dirtyFields.categoryFields) {
          changedData.categoryFields = {};
          Object.keys(dirtyFields.categoryFields).forEach((subKey) => {
            if (dirtyFields.categoryFields?.[subKey]) {
              const value = currentValues.categoryFields[subKey];
              if (value !== undefined) {
                changedData.categoryFields![subKey] = value;
              }
            }
          });
        } else if (fieldKey === "productImages" && dirtyFields.productImages) {
          changedData.productImages = currentValues.productImages;
        } else if (fieldKey === "specImages" && dirtyFields.specImages) {
          changedData.specImages = currentValues.specImages;
        } else {
          const value = currentValues[fieldKey];
          if (value !== undefined) {
            (changedData as Record<string, unknown>)[fieldKey] = value;
          }
        }
      }
    });

    return changedData;
  }, [dirtyFields, getValues]);

  const hasChanges = useMemo((): boolean => {
    if (!watchedValues) return false;
    return Object.keys(dirtyFields).length > 0;
  }, [dirtyFields, watchedValues]);

  useEffect(() => {
    if (convertedFormData) {
      reset(convertedFormData);
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
          console.warn("Failed to load product images:", error);
          convertedData.productImages = [];
        }
      }

      if (data.specImageUrls && data.specImageUrls.length > 0) {
        try {
          const specFiles = await urlsToFiles(data.specImageUrls);
          convertedData.specImages = specFiles;
        } catch (error) {
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

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-60 md:px-10">
        <div className="flex min-h-64 items-center justify-center">
          <div className="text-center">
            <div className="border-main mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
            <p className="text-gray-600">파일을 로딩중입니다...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-60 md:px-10">
        <div className="flex min-h-64 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-red-500">
              <svg
                className="mx-auto mb-2 h-12 w-12"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              파일 로딩 실패
            </h3>
            <p className="mb-4 text-gray-600">
              {error instanceof Error
                ? error.message
                : "알 수 없는 오류가 발생했습니다."}
            </p>
            <div className="space-x-4">
              <button
                onClick={() => refetch()}
                className="bg-main hover:bg-main-dark focus:ring-main inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                다시 시도
              </button>
              <button
                onClick={() => {
                  reset(initialData);
                }}
                className="focus:ring-main inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                파일 없이 진행
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const updateCompleteProduct = async (
    data: ProductUpdateFormData,
  ): Promise<PartialProductUpdate> => {
    // 변경된 필드만 가져오기
    const changedFields = getChangedFields();
    console.log("🚀 Changed fields for update:", changedFields);

    if (Object.keys(changedFields).length === 0) {
      throw new Error("변경된 내용이 없습니다.");
    }

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

    // 변경된 데이터로 업데이트용 객체 생성
    const updateData: Partial<ProductUpdateFormData> = { ...changedFields };

    // 카테고리는 항상 포함 (API에서 필요)
    updateData.category = data.category;

    const transformedData: Record<string, unknown> = { id: productId };

    // 파일 업로드가 필요한 변경사항 처리
    if (selectedCategory === CategoriesEnum.LIGHT) {
      // LIGHT 카테고리의 경우
      if (changedFields.name) {
        transformedData.name = changedFields.name;
      }

      if (changedFields.catalogFile) {
        const catalogUrl = await uploadDocument(changedFields.catalogFile);
        transformedData.catalogFile = catalogUrl;
      }

      if (changedFields.categoryFields) {
        transformedData.light = changedFields.categoryFields;
      }
    } else {
      // 표준 제품들 (CAMERA, LENS, FRAMEGRABBER, SOFTWARE)
      if (changedFields.name) {
        transformedData.name = changedFields.name;
      }

      if (changedFields.mainFeature) {
        transformedData.mainFeature = changedFields.mainFeature;
      }

      // 이미지 업로드 - 변경된 이미지들과 기존 이미지들을 합치는 로직
      let allImages: Array<{
        order: number;
        type: "PRODUCT" | "SPEC";
        path: string;
      }> = [];

      if (
        changedFields.productImages &&
        changedFields.productImages.length > 0
      ) {
        const productImageUrls = await uploadImages(
          changedFields.productImages,
        );
        // 새로 업로드된 제품 이미지들
        const newProductImages = productImageUrls.map(
          (path: string, index: number) => ({
            order: index + 1,
            type: "PRODUCT" as const,
            path,
          }),
        );
        allImages = [...allImages, ...newProductImages];
      }

      if (changedFields.specImages && changedFields.specImages.length > 0) {
        const specImageUrls = await uploadImages(changedFields.specImages);
        // 새로 업로드된 스펙 이미지들 (제품 이미지 개수만큼 order 조정)
        const productImageCount = allImages.filter(
          (img) => img.type === "PRODUCT",
        ).length;
        const newSpecImages = specImageUrls.map(
          (path: string, index: number) => ({
            order: productImageCount + index + 1,
            type: "SPEC" as const,
            path,
          }),
        );
        allImages = [...allImages, ...newSpecImages];
      }

      // 이미지가 있으면 전체 이미지 배열로 전송
      if (allImages.length > 0) {
        transformedData.images = allImages;
      }

      // 문서 파일 업로드
      if (changedFields.datasheetFile) {
        const datasheetUrl = await uploadDocument(changedFields.datasheetFile);
        transformedData.datasheetFile = datasheetUrl;
      }

      if (changedFields.drawingFile) {
        const drawingUrl = await uploadDocument(changedFields.drawingFile);
        transformedData.drawingFile = drawingUrl;
      }

      if (changedFields.manualFile) {
        const manualUrl = await uploadDocument(changedFields.manualFile);
        transformedData.manualFile = manualUrl;
      }

      // 카테고리별 필드
      if (changedFields.categoryFields) {
        const categoryKey = CategoryRelationMapKebab[data.category].replace(
          "-",
          "",
        );
        transformedData[categoryKey] = {
          id: categoryId,
          ...changedFields.categoryFields,
        };
      }
    }

    console.log(transformedData);

    // API 호출 - PATCH 요청으로 변경된 필드만 전송
    const response = await protectApi.patch(
      `/api/product/update/${productId}?category=${data.category}`,
      transformedData,
    );

    console.log(response.data);

    // // 반환된 데이터를 PartialProductUpdate 형태로 변환
    // const responseData = response.data as Product;

    // const partialUpdate: PartialProductUpdate = {
    //   categories: responseData.categories as CategoriesEnum,
    //   name: responseData.name,
    //   mainFeature: responseData.mainFeature,
    //   datasheetUrl: responseData.datasheetUrl,
    //   drawingUrl: responseData.drawingUrl,
    //   manualUrl: responseData.manualUrl,
    //   images: responseData.images?.map((img) => ({
    //     type: img.type,
    //     path: img.path,
    //     order: img.order,
    //   })),
    // };

    // // 카테고리별 데이터 추가 (id 제외)
    // if (responseData.camera) {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const { id, product, ...cameraData } = responseData.camera;
    //   partialUpdate.camera = cameraData;
    // }
    // if (responseData.frameGrabber) {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const { id, product, ...frameGrabberData } = responseData.frameGrabber;
    //   partialUpdate.frameGrabber = frameGrabberData;
    // }
    // if (responseData.lens) {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const { id, product, ...lensData } = responseData.lens;
    //   partialUpdate.lens = lensData;
    // }
    // if (responseData.light) {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const { id, product, ...lightData } = responseData.light;
    //   partialUpdate.light = lightData;
    // }
    // if (responseData.software) {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const { id, product, ...softwareData } = responseData.software;
    //   partialUpdate.software = softwareData;
    // }

    // console.log("✅ Update completed:", partialUpdate);
    // return partialUpdate;
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-60 md:px-10">
      <form onSubmit={handleSubmit(updateCompleteProduct)}>
        <hr className="border-gray200 absolute left-0 w-screen border-t" />
        <div className="border-main mb-5 border-b py-5.5 sm:gap-0">
          <h2 className="text-main text-2xl font-bold">제품수정</h2>
        </div>

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

        <button
          type="submit"
          disabled={isSubmitting || !hasChanges}
          className="group border-gray300 ml-auto flex w-64 border-b py-2.5 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="text-gray300 flex w-full items-center justify-end gap-5 text-xl font-normal group-hover:font-semibold">
            수정하기
            <div className="border-gray300 group-hover:bg-gray100 flex size-9 items-center justify-center rounded-full border bg-white">
              {isSubmitting ? (
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

export default UpdateProductPage;

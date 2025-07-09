import {
  CategoriesEnum,
  CategoryRelationMapKebab,
} from "@humming-vision/shared";
import { UploadService, createImageData } from "./uploadService";

export interface ProductApiProcessor<TFormData, TApiData> {
  processData: (
    formData: TFormData,
    changedFields?: Partial<TFormData>,
  ) => Promise<TApiData>;
}

interface ProductFormData {
  category: CategoriesEnum;
  name?: string;
  mainFeature?: string;
  productImages?: File[];
  specImages?: File[];
  datasheetFile?: File;
  drawingFile?: File;
  manualFile?: File;
  catalogFile?: File;
  categoryFields?: Record<string, string>;
}

export const createProductApiProcessor = <
  TFormData extends ProductFormData,
  TApiData extends { category: CategoriesEnum; id: number },
>(
  uploadService: UploadService,
  baseData: Partial<TApiData>,
  isUpdate: boolean = false,
): ProductApiProcessor<TFormData, TApiData> => {
  const processData = async (
    formData: TFormData,
    changedFields?: Partial<TFormData>,
  ): Promise<TApiData> => {
    const fieldsToProcess = isUpdate
      ? changedFields || ({} as Partial<TFormData>)
      : formData;
    const transformedData = { ...baseData } as Record<string, unknown>;

    if (fieldsToProcess.name) {
      transformedData.name = fieldsToProcess.name;
    }

    if (fieldsToProcess.mainFeature) {
      transformedData.mainFeature = fieldsToProcess.mainFeature;
    }

    if (formData.category === CategoriesEnum.LIGHT) {
      if (fieldsToProcess.catalogFile) {
        const catalogUrl = await uploadService.uploadDocument(
          fieldsToProcess.catalogFile,
        );
        transformedData.catalogUrl = catalogUrl;
      }

      if (fieldsToProcess.categoryFields) {
        transformedData.light = isUpdate
          ? {
              id: transformedData.categoryId,
              ...fieldsToProcess.categoryFields,
            }
          : fieldsToProcess.categoryFields;
      }
    } else {
      let allImages: Array<{
        order: number;
        type: "PRODUCT" | "SPEC";
        path: string;
      }> = [];

      if (
        fieldsToProcess.productImages &&
        fieldsToProcess.productImages.length > 0
      ) {
        const productImageUrls = await uploadService.uploadImages(
          fieldsToProcess.productImages,
        );
        const productImages = createImageData(productImageUrls, "PRODUCT");
        allImages = [...allImages, ...productImages];
      }

      if (fieldsToProcess.specImages && fieldsToProcess.specImages.length > 0) {
        const specImageUrls = await uploadService.uploadImages(
          fieldsToProcess.specImages,
        );
        const specImages = createImageData(specImageUrls, "SPEC");
        allImages = [...allImages, ...specImages];
      }

      if (allImages.length > 0) {
        transformedData.images = allImages;
      }

      const documentFields = [
        { field: "datasheetFile" as keyof TFormData, urlField: "datasheetUrl" },
        { field: "drawingFile" as keyof TFormData, urlField: "drawingUrl" },
        { field: "manualFile" as keyof TFormData, urlField: "manualUrl" },
      ] as const;

      for (const { field, urlField } of documentFields) {
        const file = fieldsToProcess[field] as File | undefined;
        if (file) {
          const url = await uploadService.uploadDocument(file);
          transformedData[urlField] = url;
        }
      }

      if (fieldsToProcess.categoryFields) {
        const categoryKey = CategoryRelationMapKebab[formData.category].replace(
          "-",
          "",
        );
        transformedData[categoryKey] = isUpdate
          ? {
              id: transformedData.categoryId,
              ...fieldsToProcess.categoryFields,
            }
          : fieldsToProcess.categoryFields;
      }
    }

    return transformedData as TApiData;
  };

  return { processData };
};

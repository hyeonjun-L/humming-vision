import { useMemo } from "react";
import { useForm, DefaultValues } from "react-hook-form";
import { CategoriesEnum } from "@humming-vision/shared";

export interface BaseProductFormData {
  category: CategoriesEnum;
  name: string;
  mainFeature?: string;
  productImages?: File[];
  specImages?: File[];
  datasheetFile?: File;
  drawingFile?: File;
  manualFile?: File;
  catalogFile?: File;
  categoryFields?: Record<string, string>;
}

export function useProductForm<T extends BaseProductFormData>(
  defaultValues?: DefaultValues<T>,
) {
  const form = useForm<T>({
    defaultValues,
  });

  const watchedValues = form.watch();

  const getChangedFields = useMemo(() => {
    return (initialData?: T): Partial<T> => {
      if (!watchedValues || !initialData) return {};

      const changedData: Partial<T> = {};

      const textFields = ["name", "mainFeature"] as const;
      for (const field of textFields) {
        if (watchedValues[field] !== initialData[field]) {
          changedData[field] = watchedValues[field];
        }
      }

      const fileFields = [
        "datasheetFile",
        "drawingFile",
        "manualFile",
        "catalogFile",
      ] as const;
      for (const field of fileFields) {
        const currentFile = watchedValues[field];
        const initialFile = initialData[field];

        if (
          !!currentFile !== !!initialFile ||
          (currentFile instanceof File &&
            initialFile instanceof File &&
            currentFile !== initialFile)
        ) {
          changedData[field] = currentFile;
        }
      }

      const imageFields = ["productImages", "specImages"] as const;
      for (const field of imageFields) {
        const currentImages = watchedValues[field] || [];
        const initialImages = initialData[field] || [];

        let isChanged = false;
        if (currentImages.length !== initialImages.length) {
          isChanged = true;
        } else {
          for (let i = 0; i < currentImages.length; i++) {
            if (currentImages[i] !== initialImages[i]) {
              isChanged = true;
              break;
            }
          }
        }

        if (isChanged) {
          changedData[field] = currentImages;
        }
      }

      if (watchedValues.categoryFields && initialData.categoryFields) {
        const currentCategoryFields = watchedValues.categoryFields;
        const initialCategoryFields = initialData.categoryFields;

        const allKeys = new Set([
          ...Object.keys(currentCategoryFields),
          ...Object.keys(initialCategoryFields),
        ]);

        let categoryChanged = false;
        const changedCategoryFields: Record<string, unknown> = {};

        for (const key of allKeys) {
          if (currentCategoryFields[key] !== initialCategoryFields[key]) {
            categoryChanged = true;
            changedCategoryFields[key] = currentCategoryFields[key];
          }
        }

        if (categoryChanged) {
          changedData.categoryFields = changedCategoryFields as Record<
            string,
            string
          >;
        }
      }

      return changedData;
    };
  }, [watchedValues]);

  const hasChanges = useMemo(() => {
    return (initialData?: T): boolean => {
      if (!watchedValues || !initialData) return false;

      const textFields = ["name", "mainFeature"] as const;
      for (const field of textFields) {
        if (watchedValues[field] !== initialData[field]) {
          return true;
        }
      }

      const fileFields = [
        "datasheetFile",
        "drawingFile",
        "manualFile",
        "catalogFile",
      ] as const;
      for (const field of fileFields) {
        const currentFile = watchedValues[field];
        const initialFile = initialData[field];

        if (!!currentFile !== !!initialFile) {
          return true;
        }
        if (
          currentFile instanceof File &&
          initialFile instanceof File &&
          currentFile !== initialFile
        ) {
          return true;
        }
      }

      const imageFields = ["productImages", "specImages"] as const;
      for (const field of imageFields) {
        const currentImages = watchedValues[field] || [];
        const initialImages = initialData[field] || [];

        if (currentImages.length !== initialImages.length) {
          return true;
        }

        for (let i = 0; i < currentImages.length; i++) {
          if (currentImages[i] !== initialImages[i]) {
            return true;
          }
        }
      }

      if (watchedValues.categoryFields && initialData.categoryFields) {
        const currentCategoryFields = watchedValues.categoryFields;
        const initialCategoryFields = initialData.categoryFields;

        const allKeys = new Set([
          ...Object.keys(currentCategoryFields),
          ...Object.keys(initialCategoryFields),
        ]);

        for (const key of allKeys) {
          if (currentCategoryFields[key] !== initialCategoryFields[key]) {
            return true;
          }
        }
      }

      return false;
    };
  }, [watchedValues]);

  return {
    ...form,
    watchedValues,
    getChangedFields,
    hasChanges,
  };
}

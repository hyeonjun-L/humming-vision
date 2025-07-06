import { z } from "zod";
import { CategoriesEnum, CategoryRelationMap } from "@humming-vision/shared";
import { categoryFieldOptions } from "../_const/constants";
import {
  ProductUpdateApiData,
  StandardProductUpdateApiData,
  LightProductUpdateApiData,
} from "../_types/product-update.type";

const fileOrStringSchema = z
  .union([z.instanceof(File), z.string().url()])
  .nullable()
  .optional();

const standardProductUpdateSchema = z.object({
  id: z.number(),
  name: z
    .string({ required_error: "제품명은 필수입니다" })
    .min(1, "제품명은 필수입니다"),
  subCategory: z.string().optional(),
  mainFeature: z
    .string({ required_error: "주요 특징은 필수입니다" })
    .min(1, "주요 특징은 필수입니다"),
  productImages: z
    .array(z.union([z.instanceof(File), z.string().url()]))
    .min(1, "제품 이미지는 최소 1개 필요합니다"),
  specImages: z
    .array(z.union([z.instanceof(File), z.string().url()]))
    .min(1, "스펙 이미지는 최소 1개 필요합니다"),
  datasheetFile: fileOrStringSchema,
  drawingFile: fileOrStringSchema,
  manualFile: fileOrStringSchema,
});

const lightProductUpdateSchema = z.object({
  id: z.number(),
  name: z
    .string({ required_error: "제품명은 필수입니다" })
    .min(1, "제품명은 필수입니다"),
  catalogFile: z.union([z.instanceof(File), z.string().url()]).optional(),
});

const createCategoryUpdateSchema = (category: CategoriesEnum) => {
  const fields = categoryFieldOptions[category];
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    const requiredMessage = `${field.label}은(는) 필수입니다`;
    const invalidMessage = `${field.label}을(를) 올바르게 입력해주세요`;

    if (field.type === "select") {
      const options = field.options?.map((option) => option.value) || [];
      schemaFields[field.fieldName] = field.required
        ? z.enum(options as [string, ...string[]], {
            required_error: requiredMessage,
            invalid_type_error: invalidMessage,
          })
        : z.enum(options as [string, ...string[]]).optional();
    } else {
      // input type
      if (
        [
          "resolutionX",
          "resolutionY",
          "speed",
          "pixelSize",
          "memory",
          "resolution",
          "focalLength",
          "formatSize",
        ].includes(field.fieldName)
      ) {
        // 숫자형 필드
        schemaFields[field.fieldName] = field.required
          ? z.coerce
              .number({
                required_error: requiredMessage,
                invalid_type_error: invalidMessage,
              })
              .min(0, `${field.label}은(는) 0 이상이어야 합니다`)
          : z.coerce.number().min(0).optional();
      } else {
        // 문자형 필드
        schemaFields[field.fieldName] = field.required
          ? z
              .string({
                required_error: requiredMessage,
                invalid_type_error: invalidMessage,
              })
              .min(1, requiredMessage)
          : z.string().optional();
      }
    }
  });

  return z.object(schemaFields);
};

export const getUpdateFormSchema = (category: CategoriesEnum) => {
  const categorySchema = createCategoryUpdateSchema(category);
  const baseSchema = z.object({
    id: z.number(),
    category: z.literal(category),
  });

  if (category === CategoriesEnum.LIGHT) {
    return baseSchema
      .merge(lightProductUpdateSchema)
      .merge(z.object({ categoryFields: categorySchema }));
  }

  return baseSchema
    .merge(standardProductUpdateSchema)
    .merge(z.object({ categoryFields: categorySchema }));
};

// 헬퍼 함수들
const transformUpdateCategoryFields = (
  category: CategoriesEnum,
  categoryFields: Record<string, string>,
  subCategory?: string,
) => {
  // subCategory가 있는 경우 type 필드로 설정
  const result = { ...categoryFields };
  if (
    subCategory &&
    (category === CategoriesEnum.CAMERA || category === CategoriesEnum.LENS)
  ) {
    result.type = subCategory;
  }
  return result;
};

const createUpdateBaseProductDto = (data: StandardProductUpdateApiData) => {
  const productImages = data.productImages.map(
    (path: string, index: number) => ({
      order: index + 1,
      type: "PRODUCT" as const,
      path,
    }),
  );

  const specImages = data.specImages.map((path: string, index: number) => ({
    order: index + 1,
    type: "SPEC" as const,
    path,
  }));

  const allImages = [...productImages, ...specImages];

  const result: Record<string, unknown> = {
    name: data.name,
    mainFeature: data.mainFeature,
    images: allImages,
  };

  // Optional 필드들은 값이 있을 때만 추가
  if (data.datasheetFile) {
    result.datasheetUrl = data.datasheetFile;
  }
  if (data.drawingFile) {
    result.drawingUrl = data.drawingFile;
  }
  if (data.manualFile) {
    result.manualUrl = data.manualFile;
  }

  return result;
};

const createUpdateLightProductDto = (data: LightProductUpdateApiData) => {
  const result: Record<string, unknown> = {
    name: data.name,
    light: data.categoryFields || {},
  };

  // catalogFile이 있는 경우에만 catalogUrl 추가
  if (data.catalogFile) {
    result.catalogUrl = data.catalogFile;
  }

  return result;
};

export const createUpdateCompleteProductDto = (data: ProductUpdateApiData) => {
  const { category, categoryFields } = data;

  // LIGHT 제품의 경우 간단한 구조
  if (category === CategoriesEnum.LIGHT) {
    return createUpdateLightProductDto(data as LightProductUpdateApiData);
  }

  // 일반 제품들 (CAMERA, FRAMEGRABBER, LENS, SOFTWARE)
  const standardData = data as StandardProductUpdateApiData;
  const baseDto = createUpdateBaseProductDto(standardData);

  switch (category) {
    case CategoriesEnum.CAMERA: {
      const cameraFields = transformUpdateCategoryFields(
        CategoriesEnum.CAMERA,
        categoryFields,
        standardData.subCategory,
      );
      return {
        ...baseDto,
        [CategoryRelationMap.CAMERA]: cameraFields,
      };
    }

    case CategoriesEnum.FRAMEGRABBER: {
      const frameGrabberFields = transformUpdateCategoryFields(
        CategoriesEnum.FRAMEGRABBER,
        categoryFields,
      );
      return {
        ...baseDto,
        [CategoryRelationMap.FRAMEGRABBER]: frameGrabberFields,
      };
    }

    case CategoriesEnum.LENS: {
      const lensFields = transformUpdateCategoryFields(
        CategoriesEnum.LENS,
        categoryFields,
        standardData.subCategory,
      );
      return {
        ...baseDto,
        [CategoryRelationMap.LENS]: lensFields,
      };
    }

    case CategoriesEnum.SOFTWARE: {
      const softwareFields = transformUpdateCategoryFields(
        CategoriesEnum.SOFTWARE,
        categoryFields,
      );
      return {
        ...baseDto,
        [CategoryRelationMap.SOFTWARE]: softwareFields,
      };
    }

    default:
      throw new Error(`Unknown category: ${category}`);
  }
};

// 이미지 타입 정의
type ProductImage = {
  type: "PRODUCT" | "SPEC";
  order: number;
  path: string;
};

// 기존 제품 데이터를 폼 데이터로 변환하는 함수
export const transformProductToFormData = (productData: {
  id: number;
  name: string;
  categories: CategoriesEnum;
  subCategory?: string;
  mainFeature?: string;
  datasheetUrl?: string;
  drawingUrl?: string;
  manualUrl?: string;
  catalogUrl?: string;
  images?: ProductImage[];
  [key: string]: unknown;
}) => {
  const {
    id,
    name,
    categories: category,
    subCategory,
    mainFeature,
    datasheetUrl,
    drawingUrl,
    manualUrl,
    catalogUrl,
    images = [],
    ...categoryData
  } = productData;

  // 이미지 분류
  const productImages = images
    .filter((img: ProductImage) => img.type === "PRODUCT")
    .sort((a: ProductImage, b: ProductImage) => a.order - b.order)
    .map((img: ProductImage) => img.path);

  const specImages = images
    .filter((img: ProductImage) => img.type === "SPEC")
    .sort((a: ProductImage, b: ProductImage) => a.order - b.order)
    .map((img: ProductImage) => img.path);

  // 카테고리 필드 추출
  const relationField =
    CategoryRelationMap[category as keyof typeof CategoryRelationMap];
  const categoryFields =
    (categoryData[relationField] as Record<string, unknown>) || {};

  const baseFormData = {
    id,
    category,
    name,
  };

  if (category === CategoriesEnum.LIGHT) {
    return {
      ...baseFormData,
      catalogFile: catalogUrl,
      categoryFields,
    };
  }

  return {
    ...baseFormData,
    subCategory,
    mainFeature: mainFeature || "",
    productImages,
    specImages,
    datasheetFile: datasheetUrl,
    drawingFile: drawingUrl,
    manualFile: manualUrl,
    categoryFields,
  };
};

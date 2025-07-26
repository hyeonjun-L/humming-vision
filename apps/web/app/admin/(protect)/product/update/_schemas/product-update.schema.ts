import { z } from "zod";
import { CategoriesEnum } from "@humming-vision/shared";
import { categoryOptions } from "../../create/_const/constants";

const fileSchema = z.instanceof(File).nullable().optional();
const stringSchema = z.string().optional();

// ProductUpdateFormData를 위한 표준 제품 스키마 (LIGHT 제외)
const standardUpdateProductSchema = z.object({
  category: z.nativeEnum(CategoriesEnum),
  name: z
    .string({ required_error: "제품명은 필수입니다" })
    .min(1, "제품명은 필수입니다"),
  productImages: z
    .array(z.instanceof(File))
    .min(1, "제품 이미지는 최소 1개 필요합니다"),
  specImages: z
    .array(z.instanceof(File))
    .min(1, "스펙 이미지는 최소 1개 필요합니다"),
  datasheetFile: fileSchema,
  drawingFile: fileSchema,
  manualFile: fileSchema,
  catalogFile: fileSchema,
  categoryFields: z.record(z.string()),
  
  // URL 필드들 (기존 파일 URL들)
  productImageUrls: z.array(z.string()).optional(),
  specImageUrls: z.array(z.string()).optional(),
  datasheetUrl: stringSchema,
  drawingUrl: stringSchema,
  manualUrl: stringSchema,
  catalogFileUrl: stringSchema,
});

// LIGHT 카테고리를 위한 스키마
const lightUpdateProductSchema = z.object({
  category: z.literal(CategoriesEnum.LIGHT),
  name: z
    .string({ required_error: "제품명은 필수입니다" })
    .min(1, "제품명은 필수입니다"),
  productImages: z.array(z.instanceof(File)).optional().default([]),
  specImages: z.array(z.instanceof(File)).optional().default([]),
  datasheetFile: fileSchema,
  drawingFile: fileSchema,
  manualFile: fileSchema,
  catalogFile: z.instanceof(File, { message: "카탈로그 파일은 필수입니다" }).optional(),
  categoryFields: z.record(z.string()),
  
  // URL 필드들
  productImageUrls: z.array(z.string()).optional(),
  specImageUrls: z.array(z.string()).optional(),
  datasheetUrl: stringSchema,
  drawingUrl: stringSchema,
  manualUrl: stringSchema,
  catalogFileUrl: stringSchema,
});

// 카테고리 필드 스키마 생성 함수
const createUpdateCategorySchema = (category: CategoriesEnum) => {
  const fields = categoryOptions[category];
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    const requiredMessage = `${field.label}은(는) 필수입니다`;

    if (field.required) {
      schemaFields[field.fieldName] = z
        .string({ required_error: requiredMessage })
        .min(1, requiredMessage);
    } else {
      schemaFields[field.fieldName] = z.string().optional();
    }
  });

  return z.object(schemaFields);
};

// 카테고리별 통합 스키마 생성
export const getUpdateFormSchema = (category: CategoriesEnum) => {
  const categoryFieldsSchema = createUpdateCategorySchema(category);
  
  if (category === CategoriesEnum.LIGHT) {
    return lightUpdateProductSchema.extend({
      categoryFields: categoryFieldsSchema,
    });
  } else {
    return standardUpdateProductSchema.extend({
      categoryFields: categoryFieldsSchema,
    });
  }
};

// 타입 추출
export type ValidatedUpdateStandardProductData = z.infer<typeof standardUpdateProductSchema>;
export type ValidatedUpdateLightProductData = z.infer<typeof lightUpdateProductSchema>;

// 업데이트용 API 데이터 타입 (파일을 URL로 변환한 후)
export type UpdateProductApiData = {
  category: CategoriesEnum;
  name: string;
  productImages?: string[];
  specImages?: string[];
  datasheetFile?: string | null;
  drawingFile?: string | null;
  manualFile?: string | null;
  catalogFile?: string | null;
  categoryFields: Record<string, string>;
};

export type StandardUpdateProductApiData = Omit<UpdateProductApiData, 'catalogFile'>;
export type LightUpdateProductApiData = Pick<UpdateProductApiData, 'category' | 'name' | 'catalogFile'>;

// DTO 생성 함수
export const createUpdateCompleteProductDto = (data: UpdateProductApiData) => {
  const { categoryFields, ...productData } = data;

  return {
    ...productData,
    [CategoryRelationMap[data.category]]: categoryFields,
  };
};

// CategoryRelationMap import (기존 파일에서 가져오기)
const CategoryRelationMap = {
  [CategoriesEnum.CAMERA]: "camera",
  [CategoriesEnum.LENS]: "lens",
  [CategoriesEnum.FRAMEGRABBER]: "frameGrabber",
  [CategoriesEnum.SOFTWARE]: "software",
  [CategoriesEnum.LIGHT]: "light",
} as const;

import { z } from "zod";
import { CategoriesEnum } from "@humming-vision/shared";
import { categoryOptions } from "../_const/constants";
import {
  createNumericFieldSchema,
  isNumericField,
} from "../../_utils/field-schema";

const fileSchema = z.instanceof(File).nullable().optional();

const standardProductSchema = z.object({
  name: z
    .string({ required_error: "제품명은 필수입니다" })
    .min(1, "제품명은 필수입니다"),
  mainFeature: z
    .string({ required_error: "주요 특징은 필수입니다" })
    .min(1, "주요 특징은 필수입니다"),
  productImages: z
    .array(z.instanceof(File))
    .min(1, "제품 이미지는 최소 1개 필요합니다"),
  specImages: z
    .array(z.instanceof(File))
    .min(1, "스펙 이미지는 최소 1개 필요합니다"),
  datasheetFile: fileSchema,
  drawingFile: fileSchema,
  manualFile: fileSchema,
});

const lightProductSchema = z.object({
  name: z
    .string({ required_error: "제품명은 필수입니다" })
    .min(1, "제품명은 필수입니다"),
  catalogFile: z.instanceof(File, { message: "카탈로그 파일은 필수입니다" }),
});

const createCategorySchema = (category: CategoriesEnum) => {
  const fields = categoryOptions[category];

  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    const requiredMessage = `${field.label}은(는) 필수입니다`;
    const invalidMessage = `${field.label}을(를) 올바르게 입력해주세요`;

    if (field.type === "select" && field.options) {
      const values = field.options.map((opt) => opt.value) as [
        string,
        ...string[],
      ];

      if (field.required) {
        schemaFields[field.fieldName] = z.enum(values, {
          required_error: requiredMessage,
          invalid_type_error: invalidMessage,
        });
      } else {
        schemaFields[field.fieldName] = z.enum(values).optional();
      }
    } else if (field.type === "input") {
      if (isNumericField(field)) {
        // 숫자 필드
        schemaFields[field.fieldName] = createNumericFieldSchema(field);
      } else {
        // 일반 문자열 필드
        schemaFields[field.fieldName] = field.required
          ? z
              .string({ required_error: requiredMessage })
              .min(1, requiredMessage)
          : z.string().optional();
      }
    }
  });

  return z.object(schemaFields);
};

const createCompleteFormSchema = (category: CategoriesEnum) => {
  if (category === CategoriesEnum.LIGHT) {
    return lightProductSchema.extend({
      category: z.literal(category, {
        required_error: "제품 카테고리는 필수입니다",
        invalid_type_error: "올바른 카테고리를 선택해주세요",
      }),
    });
  }

  const categorySchema = createCategorySchema(category);
  return standardProductSchema.extend({
    category: z.literal(category, {
      required_error: "제품 카테고리는 필수입니다",
      invalid_type_error: "올바른 카테고리를 선택해주세요",
    }),
    subCategory: z
      .string({
        required_error: "서브 카테고리는 필수입니다",
      })
      .min(1, "서브 카테고리를 선택해주세요"),
    categoryFields: categorySchema,
  });
};

const formSchemas = {
  [CategoriesEnum.CAMERA]: createCompleteFormSchema(CategoriesEnum.CAMERA),
  [CategoriesEnum.FRAMEGRABBER]: createCompleteFormSchema(
    CategoriesEnum.FRAMEGRABBER,
  ),
  [CategoriesEnum.LENS]: createCompleteFormSchema(CategoriesEnum.LENS),
  [CategoriesEnum.LIGHT]: createCompleteFormSchema(CategoriesEnum.LIGHT),
  [CategoriesEnum.SOFTWARE]: createCompleteFormSchema(CategoriesEnum.SOFTWARE),
};

export const getFormSchema = (category: CategoriesEnum) => {
  return formSchemas[category];
};

import { z } from "zod";
import { CategoriesEnum, CategoryRelationMap } from "@humming-vision/shared";
import { categoryOptions } from "../_const/constants";
import {
  CameraFields,
  CreateCategoryFields,
  FrameGrabberFields,
  LensFields,
  LightFields,
  SoftwareFields,
  ProductApiData,
  StandardProductApiData,
  LightProductApiData,
} from "../_types/product.type";

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
      if (field.unit) {
        if (field.required) {
          schemaFields[field.fieldName] = z
            .string({ required_error: requiredMessage })
            .min(1, requiredMessage)
            .transform((val) => {
              const num = Number(val);
              return isNaN(num) ? 0 : num;
            })
            .pipe(
              z.number().min(0, `${field.label}은(는) 0 이상이어야 합니다`),
            );
        } else {
          schemaFields[field.fieldName] = z
            .string()
            .optional()
            .transform((val) => {
              if (!val) return undefined;
              const num = Number(val);
              return isNaN(num) ? undefined : num;
            })
            .pipe(
              z
                .number()
                .min(0, `${field.label}은(는) 0 이상이어야 합니다`)
                .optional(),
            );
        }
      } else {
        if (field.required) {
          schemaFields[field.fieldName] = z
            .string({ required_error: requiredMessage })
            .min(1, requiredMessage);
        } else {
          schemaFields[field.fieldName] = z.string().optional();
        }
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

const categorySchemas = {
  [CategoriesEnum.CAMERA]: createCategorySchema(CategoriesEnum.CAMERA),
  [CategoriesEnum.FRAMEGRABBER]: createCategorySchema(
    CategoriesEnum.FRAMEGRABBER,
  ),
  [CategoriesEnum.LENS]: createCategorySchema(CategoriesEnum.LENS),
  [CategoriesEnum.LIGHT]: createCategorySchema(CategoriesEnum.LIGHT),
  [CategoriesEnum.SOFTWARE]: createCategorySchema(CategoriesEnum.SOFTWARE),
};

function transformCategoryFields(
  category: CategoriesEnum.CAMERA,
  categoryFields: Record<string, string>,
  subCategory?: string,
): CameraFields;

function transformCategoryFields(
  category: CategoriesEnum.FRAMEGRABBER,
  categoryFields: Record<string, string>,
  subCategory?: string,
): FrameGrabberFields;

function transformCategoryFields(
  category: CategoriesEnum.LENS,
  categoryFields: Record<string, string>,
  subCategory?: string,
): LensFields;

function transformCategoryFields(
  category: CategoriesEnum.SOFTWARE,
  categoryFields: Record<string, string>,
  subCategory?: string,
): SoftwareFields;

function transformCategoryFields(
  category: CategoriesEnum.LIGHT,
  categoryFields: Record<string, string>,
  subCategory?: string,
): LightFields;

function transformCategoryFields(
  category: CategoriesEnum,
  categoryFields: Record<string, string>,
  subCategory?: string,
): CreateCategoryFields {
  const schema = categorySchemas[category];

  try {
    const validatedFields = schema.parse(categoryFields);

    if (subCategory) {
      return { ...validatedFields, type: subCategory } as CreateCategoryFields;
    }

    return validatedFields as CreateCategoryFields;
  } catch (error) {
    console.error(`Validation error for ${category}:`, error);
    throw error;
  }
}

export const createBaseProductDto = (data: StandardProductApiData) => {
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

  return {
    name: data.name,
    mainFeature: data.mainFeature,
    datasheetUrl: data.datasheetFile,
    drawingUrl: data.drawingFile,
    manualUrl: data.manualFile,
    images: allImages,
  };
};

export const createLightProductDto = (data: LightProductApiData) => {
  return {
    name: data.name,
    light: {
      catalogUrl: data.catalogFile,
    },
  };
};

export function createCompleteProductDto(data: ProductApiData) {
  // LIGHT 제품의 경우 간단한 구조
  if (data.category === CategoriesEnum.LIGHT) {
    return createLightProductDto(data as LightProductApiData);
  }

  // 일반 제품들 (CAMERA, FRAMEGRABBER, LENS, SOFTWARE)
  const standardData = data as StandardProductApiData;
  const baseDto = createBaseProductDto(standardData);

  switch (data.category) {
    case CategoriesEnum.CAMERA: {
      const cameraFields = transformCategoryFields(
        CategoriesEnum.CAMERA,
        standardData.categoryFields,
        standardData.subCategory,
      );
      return {
        ...baseDto,
        [CategoryRelationMap.CAMERA]: cameraFields,
      };
    }

    case CategoriesEnum.FRAMEGRABBER: {
      const frameGrabberFields = transformCategoryFields(
        CategoriesEnum.FRAMEGRABBER,
        standardData.categoryFields,
      );
      return {
        ...baseDto,
        [CategoryRelationMap.FRAMEGRABBER]: frameGrabberFields,
      };
    }

    case CategoriesEnum.LENS: {
      const lensFields = transformCategoryFields(
        CategoriesEnum.LENS,
        standardData.categoryFields,
        standardData.subCategory,
      );
      return {
        ...baseDto,
        [CategoryRelationMap.LENS]: lensFields,
      };
    }

    case CategoriesEnum.SOFTWARE: {
      const softwareFields = transformCategoryFields(
        CategoriesEnum.SOFTWARE,
        standardData.categoryFields,
      );
      return {
        ...baseDto,
        [CategoryRelationMap.SOFTWARE]: softwareFields,
      };
    }

    default:
      throw new Error(`Unknown category: ${data.category}`);
  }
}

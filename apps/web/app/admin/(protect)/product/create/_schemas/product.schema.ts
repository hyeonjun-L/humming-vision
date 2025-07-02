import { z } from "zod";
import { CategoriesEnum, CreateCategoryDtoMap } from "@humming-vision/shared";
import { categoryOptions, type ProductFormData } from "../_const/constants";

type CameraFields = CreateCategoryDtoMap[CategoriesEnum.CAMERA]["camera"];
type FrameGrabberFields =
  CreateCategoryDtoMap[CategoriesEnum.FRAMEGRABBER]["frameGrabber"];
type LensFields = CreateCategoryDtoMap[CategoriesEnum.LENS]["lens"];
type SoftwareFields = CreateCategoryDtoMap[CategoriesEnum.SOFTWARE]["software"];
type LightFields = CreateCategoryDtoMap[CategoriesEnum.LIGHT]["light"];

type CreateCategoryFields =
  | CameraFields
  | FrameGrabberFields
  | LensFields
  | SoftwareFields
  | LightFields;

const fileSchema = z.instanceof(File).nullable().optional();

const baseProductSchema = z.object({
  name: z.string().min(1, "제품명은 필수입니다"),
  mainFeature: z.string().min(1, "주요 특징은 필수입니다"),
  manufacturer: z.string().min(1, "제조사는 필수입니다"),
  productImages: z
    .array(z.instanceof(File))
    .min(1, "제품 이미지는 최소 1개 필요합니다"),
  specImages: z.array(z.instanceof(File)),
  datasheetFile: fileSchema,
  drawingFile: fileSchema,
  manualFile: fileSchema,
});

const createCategorySchema = (category: CategoriesEnum) => {
  const fields = categoryOptions[category];
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    if (field.type === "select" && field.options) {
      const values = field.options.map((opt) => opt.value) as [
        string,
        ...string[],
      ];

      if (field.required) {
        schemaFields[field.fieldName] = z.enum(values);
      } else {
        schemaFields[field.fieldName] = z.enum(values).optional();
      }
    } else if (field.type === "input") {
      if (field.unit) {
        if (field.required) {
          schemaFields[field.fieldName] = z
            .string()
            .transform((val) => {
              const num = Number(val);
              return isNaN(num) ? 0 : num;
            })
            .pipe(z.number().min(0));
        } else {
          schemaFields[field.fieldName] = z
            .string()
            .optional()
            .transform((val) => {
              if (!val) return undefined;
              const num = Number(val);
              return isNaN(num) ? undefined : num;
            })
            .pipe(z.number().min(0).optional());
        }
      } else {
        if (field.required) {
          schemaFields[field.fieldName] = z.string();
        } else {
          schemaFields[field.fieldName] = z.string().optional();
        }
      }
    }
  });

  return z.object(schemaFields);
};

const createCompleteFormSchema = (category: CategoriesEnum) => {
  const categorySchema = createCategorySchema(category);

  return baseProductSchema.extend({
    category: z.literal(category),
    subCategory: z.string().optional(),
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

export const createBaseProductDto = (data: ProductFormData) => {
  const productImages = data.productImages.map((file, index) => ({
    order: index + 1,
    type: "PRODUCT" as const,
    path: `temp-url-${file.name}`,
  }));

  const specImages = data.specImages.map((file, index) => ({
    order: index + 1,
    type: "SPEC" as const,
    path: `temp-url-${file.name}`,
  }));

  const allImages = [...productImages, ...specImages];

  return {
    name: data.name,
    mainFeature: data.mainFeature,
    datasheetUrl: data.datasheetFile
      ? `temp-url-${data.datasheetFile.name}`
      : undefined,
    drawingUrl: data.drawingFile
      ? `temp-url-${data.drawingFile.name}`
      : undefined,
    manualUrl: data.manualFile ? `temp-url-${data.manualFile.name}` : undefined,
    images: allImages,
  };
};

export function createCompleteProductDto(
  data: ProductFormData,
):
  | CreateCategoryDtoMap[CategoriesEnum.CAMERA]
  | CreateCategoryDtoMap[CategoriesEnum.FRAMEGRABBER]
  | CreateCategoryDtoMap[CategoriesEnum.LENS]
  | CreateCategoryDtoMap[CategoriesEnum.SOFTWARE]
  | CreateCategoryDtoMap[CategoriesEnum.LIGHT] {
  const baseDto = createBaseProductDto(data);

  switch (data.category) {
    case CategoriesEnum.CAMERA: {
      const cameraFields = transformCategoryFields(
        CategoriesEnum.CAMERA,
        data.categoryFields,
        data.subCategory,
      );
      return {
        ...baseDto,
        camera: cameraFields,
      };
    }

    case CategoriesEnum.FRAMEGRABBER: {
      const frameGrabberFields = transformCategoryFields(
        CategoriesEnum.FRAMEGRABBER,
        data.categoryFields,
      );
      return {
        ...baseDto,
        frameGrabber: frameGrabberFields,
      };
    }

    case CategoriesEnum.LENS: {
      const lensFields = transformCategoryFields(
        CategoriesEnum.LENS,
        data.categoryFields,
        data.subCategory,
      );
      return {
        ...baseDto,
        lens: lensFields,
      };
    }

    case CategoriesEnum.SOFTWARE: {
      const softwareFields = transformCategoryFields(
        CategoriesEnum.SOFTWARE,
        data.categoryFields,
      );
      return {
        ...baseDto,
        software: softwareFields,
      };
    }

    case CategoriesEnum.LIGHT: {
      const lightFields = transformCategoryFields(
        CategoriesEnum.LIGHT,
        data.categoryFields,
      );
      return {
        ...baseDto,
        light: lightFields,
      };
    }

    default:
      throw new Error(`Unknown category: ${data.category}`);
  }
}

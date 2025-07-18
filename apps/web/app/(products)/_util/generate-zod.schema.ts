import { z, ZodTypeAny } from "zod";
import { FieldConfig } from "../_constants/paginate.const";

function generateZodSchema(fields: Record<string, FieldConfig>) {
  const schema: Record<string, ZodTypeAny> = {};

  for (const [key, config] of Object.entries(fields)) {
    switch (config.type) {
      case "enum":
        schema[key] = z.enum(config.values as [string, ...string[]]).optional();
        break;
      case "between":
        schema[key] = z
          .union([
            z.array(z.coerce.number()).length(2),
            z
              .string()
              .transform((v) => v.split(",").map(Number))
              .pipe(z.array(z.number()).length(2)),
          ])
          .optional();
        break;
      case "like":
        schema[key] = z.string().optional();
        break;
      case "order":
        schema[key] = z.enum(["ASC", "DESC"]).optional();
        break;
      case "number":
        schema[key] = z
          .preprocess((v) => Number(v), z.number().min(1))
          .optional();
        break;
    }
  }

  return z.object(schema);
}

export default generateZodSchema;

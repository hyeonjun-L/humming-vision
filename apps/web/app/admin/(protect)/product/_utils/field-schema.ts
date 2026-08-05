import { z } from "zod";
import { CategoryFieldOption } from "../create/_types/product.type";

/**
 * 단위가 붙는 필드(또는 isNumeric으로 표시한 필드)는 숫자로 검증한다.
 * focalLength처럼 단위가 타입별로 갈리는 필드는 isNumeric으로 명시한다.
 */
export const isNumericField = (field: CategoryFieldOption) =>
  Boolean(field.unit || field.isNumeric);

export const createNumericFieldSchema = (field: CategoryFieldOption) => {
  const requiredMessage = `${field.label}은(는) 필수입니다`;
  const invalidMessage = `${field.label}을(를) 올바르게 입력해주세요`;
  const minMessage = `${field.label}은(는) 0 이상이어야 합니다`;

  const numberSchema = field.required
    ? z
        .number({
          invalid_type_error: invalidMessage,
          required_error: requiredMessage,
        })
        .min(0, minMessage)
    : z
        .number({
          invalid_type_error: invalidMessage,
        })
        .min(0, minMessage)
        .optional();

  return z.preprocess((val) => {
    if (typeof val === "string") {
      if (val.trim() === "") return undefined;
      const num = Number(val);
      return isNaN(num) ? val : num;
    }
    return val;
  }, numberSchema);
};

import { CameraType, LensType } from "@humming-vision/shared";
import { CategoryFieldOption } from "../create/_types/product.type";

/**
 * 카메라/렌즈 타입에 따라 라벨과 단위를 결정한다.
 * byType 오버라이드가 있으면 우선 적용하고, 없으면 기본 label/unit을 쓴다.
 */
export const resolveCategoryFieldLabel = (
  field: CategoryFieldOption,
  type?: string,
) => {
  const override = type
    ? field.byType?.[type as CameraType | LensType]
    : undefined;

  const label = override?.label ?? field.label;
  const unit = override?.unit ?? field.unit;

  return unit ? `${label} (${unit})` : label;
};

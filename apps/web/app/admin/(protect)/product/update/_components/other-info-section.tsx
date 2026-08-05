import { Control, useWatch } from "react-hook-form";
import { CategoriesEnum } from "@humming-vision/shared";
import { categoryFieldOptions } from "../_const/constants";
import { ProductUpdateFormData } from "../_types/product-update.type";
import { TextInput, SelectInput } from "../../_components/shared-form-inputs";
import { CategoryFieldOption } from "../../create/_types/product.type";
import { resolveCategoryFieldLabel } from "../../_utils/field-label";

interface CategoryFieldProps {
  field: CategoryFieldOption;
  control: Control<ProductUpdateFormData>;
}

export const CategoryField = ({ field, control }: CategoryFieldProps) => {
  const fieldName =
    `categoryFields.${field.fieldName}` as keyof ProductUpdateFormData;

  // 카메라/렌즈 타입(AREA·LINE / CCTV·TCL)에 따라 라벨과 단위가 달라지는 필드가 있어
  // 현재 선택된 타입을 구독한다.
  const selectedType = useWatch({
    control,
    name: "categoryFields.type" as keyof ProductUpdateFormData,
  }) as string | undefined;

  const label = resolveCategoryFieldLabel(field, selectedType);
  const className = "flex w-full flex-col gap-2 lg:w-[calc(50%-10px)]";

  if (field.type === "select") {
    return (
      <SelectInput
        name={fieldName}
        control={control}
        label={label}
        options={field.options || []}
        className={className}
      />
    );
  }

  return (
    <TextInput
      name={fieldName}
      control={control}
      label={label}
      placeholder={field.placeholder}
      className={className}
      inputClassName="text-gray600 border-gray200 focus-visible:border-gray200 rounded-none text-base outline-none placeholder:text-sm focus-visible:ring-0"
    />
  );
};

interface OtherInfoSectionProps {
  control: Control<ProductUpdateFormData>;
  selectedCategory: CategoriesEnum;
}

export const OtherInfoSection = ({
  control,
  selectedCategory,
}: OtherInfoSectionProps) => {
  const categoryFields = categoryFieldOptions[selectedCategory];

  return (
    categoryFields.length > 0 && (
      <section className="border-gray200 mb-3.5 flex flex-col gap-10 border p-[30px]">
        <h3 className="text-gray600 text-xl font-semibold">기타정보</h3>
        <div className="flex flex-wrap gap-5">
          {categoryFields.map((field: CategoryFieldOption, index: number) => (
            <CategoryField
              key={`category-field-${index}`}
              field={field}
              control={control}
            />
          ))}
        </div>
      </section>
    )
  );
};

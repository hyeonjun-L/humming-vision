import { Controller, Control } from "react-hook-form";
import { Input } from "components/input";
import { SelectBox } from "components/select-box/select-box";
import { CategoriesEnum } from "@humming-vision/shared";
import {
  ProductFormData,
  CategoryFieldOption,
  categoryOptions,
} from "../_const/constants";

interface CategoryFieldProps {
  field: CategoryFieldOption;
  control: Control<ProductFormData>;
}

export const CategoryField = ({ field, control }: CategoryFieldProps) => {
  return (
    <div className="flex w-full flex-col gap-2 lg:w-[calc(50%-10px)]">
      <label className="text-gray400 font-semibold">
        {field.label}
        {field.unit && (
          <span className="text-gray300 ml-1">({field.unit})</span>
        )}
      </label>

      <Controller
        name={`categoryFields.${field.fieldName}` as keyof ProductFormData}
        control={control}
        defaultValue=""
        render={({ field: formField }) => {
          return field.type === "select" ? (
            <SelectBox
              options={field.options || []}
              onValueChange={formField.onChange}
              value={formField.value as string}
              size="full"
            />
          ) : (
            <Input
              {...formField}
              value={formField.value as string}
              size="default"
              placeholder={field.placeholder}
              className="text-gray600 border-gray200 focus-visible:border-gray200 rounded-none text-base outline-none placeholder:text-sm focus-visible:ring-0"
            />
          );
        }}
      />
    </div>
  );
};

interface OtherInfoSectionProps {
  control: Control<ProductFormData>;
  selectedCategory: CategoriesEnum;
}

export const OtherInfoSection = ({
  control,
  selectedCategory,
}: OtherInfoSectionProps) => {
  return (
    <section className="border-gray200 mb-3.5 flex flex-col gap-10 border p-[30px]">
      <h3 className="text-gray600 text-xl font-semibold">기타정보</h3>
      <div className="flex flex-wrap gap-5">
        {categoryOptions[selectedCategory]?.map(
          (field: CategoryFieldOption, index: number) => (
            <CategoryField
              key={`category-field-${index}`}
              field={field}
              control={control}
            />
          ),
        )}
      </div>
    </section>
  );
};

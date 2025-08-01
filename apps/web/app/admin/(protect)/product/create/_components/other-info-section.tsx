import { Control } from "react-hook-form";
import { CategoriesEnum } from "@humming-vision/shared";
import { categoryOptions } from "../_const/constants";
import { CategoryFieldOption, ProductFormData } from "../_types/product.type";
import { TextInput, SelectInput } from "../../_components/shared-form-inputs";

interface CategoryFieldProps {
  field: CategoryFieldOption;
  control: Control<ProductFormData>;
  subCategory?: string;
}

export const CategoryField = ({
  field,
  control,
  subCategory,
}: CategoryFieldProps) => {
  const fieldName =
    `categoryFields.${field.fieldName}` as keyof ProductFormData;
  const value =
    subCategory && Object.prototype.hasOwnProperty.call(field, subCategory)
      ? field[subCategory as keyof typeof field]
      : undefined;

  let label = field.label;
  if (subCategory === "TCL" && value) {
    label = "배율";
  }
  if (field.unit) {
    label += ` (${field.unit})`;
  } else if (value) {
    label += ` (${value})`;
  }

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
  control: Control<ProductFormData>;
  selectedCategory: CategoriesEnum;
  subCategory?: string;
}

export const OtherInfoSection = ({
  control,
  selectedCategory,
  subCategory,
}: OtherInfoSectionProps) => {
  const categoryFields = categoryOptions[selectedCategory];

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
              subCategory={subCategory}
            />
          ))}
        </div>
      </section>
    )
  );
};

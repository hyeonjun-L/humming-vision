import { Control } from "react-hook-form";
import { CategoriesEnum } from "@humming-vision/shared";
import {
  selectProductOptions,
  selectCategoryOptions,
} from "../_const/constants";
import { ProductFormData } from "../_types/product.type";
import { SelectInput } from "./form-inputs";

interface CategorySectionProps {
  control: Control<ProductFormData>;
  selectedCategory: CategoriesEnum;
}

export const CategorySection = ({
  control,
  selectedCategory,
}: CategorySectionProps) => {
  return (
    <section className="border-gray200 mb-3.5 flex flex-col gap-5 border p-[30px]">
      <h3 className="text-gray600 text-xl font-semibold">분류설정</h3>
      <div className="flex w-full gap-10">
        <SelectInput
          name="category"
          control={control}
          label="제품선택"
          options={selectProductOptions}
          required
          className="flex w-1/2 flex-col gap-2"
        />

        {selectCategoryOptions[selectedCategory] &&
          selectCategoryOptions[selectedCategory].length > 0 && (
            <SelectInput
              name="subCategory"
              control={control}
              label="카테고리 선택"
              options={selectCategoryOptions[selectedCategory]}
              className="flex w-1/2 flex-col gap-2"
            />
          )}
      </div>
    </section>
  );
};

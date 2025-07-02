import { Controller, Control } from "react-hook-form";
import { SelectBox } from "components/select-box/select-box";
import { CategoriesEnum } from "@humming-vision/shared";
import {
  ProductFormData,
  selectProductOptions,
  selectCategoryOptions,
} from "../_const/constants";

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
        <div className="flex w-1/2 flex-col gap-2">
          <label className="text-gray400 font-semibold">제품선택</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SelectBox
                options={selectProductOptions}
                onValueChange={field.onChange}
                value={field.value}
                size="full"
              />
            )}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-2">
          {selectCategoryOptions[selectedCategory] &&
            selectCategoryOptions[selectedCategory].length > 0 && (
              <>
                <label className="text-gray400 font-semibold">
                  카테고리 선택
                </label>
                <Controller
                  name="subCategory"
                  control={control}
                  render={({ field }) => (
                    <SelectBox
                      options={selectCategoryOptions[selectedCategory]}
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      size="full"
                    />
                  )}
                />
              </>
            )}
        </div>
      </div>
    </section>
  );
};

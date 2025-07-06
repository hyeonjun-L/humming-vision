import { CategoriesEnum } from "@humming-vision/shared";

interface CategorySectionProps {
  selectedCategory: CategoriesEnum;
  isDisabled?: boolean;
}

export const CategorySection = ({
  selectedCategory,
  isDisabled = true,
}: CategorySectionProps) => {
  return (
    <section className="border-gray200 mb-3.5 flex flex-col gap-5 border p-[30px]">
      <h3 className="text-gray600 text-xl font-semibold">분류설정</h3>
      <div className="flex w-full gap-10">
        <div className="flex w-1/2 flex-col gap-2">
          <label className="text-gray700 text-sm font-medium">
            제품선택 <span className="text-red-500">*</span>
          </label>
          <div className="bg-gray100 border-gray200 flex h-12 items-center rounded border px-3">
            <span className="text-gray600">
              {selectedCategory === CategoriesEnum.CAMERA && "카메라"}
              {selectedCategory === CategoriesEnum.LENS && "렌즈"}
              {selectedCategory === CategoriesEnum.FRAMEGRABBER &&
                "프레임그래버"}
              {selectedCategory === CategoriesEnum.SOFTWARE && "소프트웨어"}
              {selectedCategory === CategoriesEnum.LIGHT && "조명"}
            </span>
          </div>
          {isDisabled && (
            <p className="text-gray400 text-xs">
              제품 수정 시 카테고리는 변경할 수 없습니다.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

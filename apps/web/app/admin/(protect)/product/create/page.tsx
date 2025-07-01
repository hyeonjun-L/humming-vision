"use client";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import {
  CategoryRelationMapKebab,
  CategoriesEnum,
  CreateCategoryDtoMap,
} from "@humming-vision/shared";
import { ProductFormData } from "./_const/constants";
import { CategorySection } from "./_components/category-section";
import { InfoSection } from "./_components/info-section";
import { SpecSection } from "./_components/spec-section";
import { OtherInfoSection } from "./_components/other-info-section";

function CreateProductPage() {
  const { control, handleSubmit, watch } = useForm<ProductFormData>({
    defaultValues: {
      category: CategoryRelationMapKebab.CAMERA,
      name: "",
      mainFeature: "",
      manufacturer: "",
      productImages: [],
      specImages: [],
      datasheetFile: null,
      drawingFile: null,
      manualFile: null,
      categoryFields: {},
    },
  });

  const selectedCategory = watch("category");

  const transformToCreateDto = (data: ProductFormData) => {
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

    switch (data.category) {
      case CategoryRelationMapKebab.CAMERA:
        return {
          name: data.name,
          mainFeature: data.mainFeature,
          datasheetUrl: data.datasheetFile
            ? `temp-url-${data.datasheetFile.name}`
            : undefined,
          drawingUrl: data.drawingFile
            ? `temp-url-${data.drawingFile.name}`
            : undefined,
          manualUrl: data.manualFile
            ? `temp-url-${data.manualFile.name}`
            : undefined,
          images: allImages,
          camera: {
            interface: (data.categoryFields["인터페이스"] || "GIGE") as
              | "GIGE"
              | "USB"
              | "CAMERA_LINK"
              | "COAXPRESS",
            type: (data.subCategory || "AREA") as "AREA" | "LINE",
            color: (data.categoryFields["컬러"] || "MONO") as "MONO" | "COLOR",
            maker: (data.categoryFields["제조사"] || "CREVIS") as
              | "CREVIS"
              | "VIEWORKS"
              | "BASLER"
              | "HIK"
              | "HUARAY"
              | "JAI",
            resolutionX: Number(data.categoryFields["X 해상도"]) || 0,
            resolutionY: Number(data.categoryFields["Y 해상도"]) || 0,
            speed: Number(data.categoryFields["속도"]) || 0,
            pixelSize: Number(data.categoryFields["픽셀 사이즈"]) || undefined,
            formatSize: data.categoryFields["포멧 사이즈"] || "",
            mountType: data.categoryFields["마운트"] || "",
            sensor: data.categoryFields["센서"] || "",
          },
        } as CreateCategoryDtoMap[CategoriesEnum.CAMERA];

      case CategoryRelationMapKebab.FRAMEGRABBER:
        return {
          name: data.name,
          mainFeature: data.mainFeature,
          datasheetUrl: data.datasheetFile
            ? `temp-url-${data.datasheetFile.name}`
            : undefined,
          drawingUrl: data.drawingFile
            ? `temp-url-${data.drawingFile.name}`
            : undefined,
          manualUrl: data.manualFile
            ? `temp-url-${data.manualFile.name}`
            : undefined,
          images: allImages,
          frameGrabber: {
            interface: (data.categoryFields["인터페이스"] || "GIGE") as
              | "GIGE"
              | "USB"
              | "CAMERA_LINK"
              | "COAXPRESS",
            maker: (data.categoryFields["제조사"] || "MATROX") as
              | "MATROX"
              | "EURESYS"
              | "ADLINK"
              | "BASLER",
            memory: Number(data.categoryFields["Memory"]) || 0,
            pcSlot: data.categoryFields["PC Slot"] || "",
            connector: data.categoryFields["Connector"] || "",
          },
        } as CreateCategoryDtoMap[CategoriesEnum.FRAMEGRABBER];

      case CategoryRelationMapKebab.LENS:
        return {
          name: data.name,
          mainFeature: data.mainFeature,
          datasheetUrl: data.datasheetFile
            ? `temp-url-${data.datasheetFile.name}`
            : undefined,
          drawingUrl: data.drawingFile
            ? `temp-url-${data.drawingFile.name}`
            : undefined,
          manualUrl: data.manualFile
            ? `temp-url-${data.manualFile.name}`
            : undefined,
          images: allImages,
          lens: {
            type: (data.subCategory || "CCTV") as "CCTV" | "TCL",
            mount: (data.categoryFields["마운트"] || "C") as
              | "C"
              | "CS"
              | "F"
              | "M",
            maker: data.categoryFields["제조사"] || "",
            resolution: Number(data.categoryFields["해상력"]) || 0,
            numericAperture: data.categoryFields["NA"] || "",
            fNumnber: data.categoryFields["F/#"] || "",
            focalLength: Number(data.categoryFields["초점거리"]) || 0,
            formatSize: Number(data.categoryFields["포멧 사이즈"]) || 0,
          },
        } as CreateCategoryDtoMap[CategoriesEnum.LENS];

      case CategoryRelationMapKebab.SOFTWARE:
        return {
          name: data.name,
          mainFeature: data.mainFeature,
          datasheetUrl: data.datasheetFile
            ? `temp-url-${data.datasheetFile.name}`
            : undefined,
          drawingUrl: data.drawingFile
            ? `temp-url-${data.drawingFile.name}`
            : undefined,
          manualUrl: data.manualFile
            ? `temp-url-${data.manualFile.name}`
            : undefined,
          images: allImages,
          software: {
            maker: (data.categoryFields["제조사"] || "MATROX") as
              | "MATROX"
              | "EURESYS",
          },
        } as CreateCategoryDtoMap[CategoriesEnum.SOFTWARE];

      case CategoryRelationMapKebab.LIGHT:
        return {
          light: {
            catalogUrl: data.categoryFields["카탈로그 URL"] || "",
          },
        } as CreateCategoryDtoMap[CategoriesEnum.LIGHT];

      default:
        throw new Error(`Unknown category: ${data.category}`);
    }
  };

  const onSubmit = (data: ProductFormData) => {
    console.log("Original form data:", data);

    try {
      const transformedData = transformToCreateDto(data);
      console.log("Transformed DTO:", transformedData);
    } catch (error) {
      console.error("Error transforming data:", error);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-60 md:px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <hr className="border-gray200 absolute left-0 w-screen border-t" />
        <div className="border-main mb-5 border-b py-5.5 sm:gap-0">
          <h2 className="text-main text-2xl font-bold">제품등록</h2>
        </div>

        <CategorySection
          control={control}
          selectedCategory={selectedCategory}
        />
        <InfoSection control={control} />
        <SpecSection control={control} />
        <OtherInfoSection
          control={control}
          selectedCategory={selectedCategory}
        />

        <button
          type="submit"
          className="group border-gray300 ml-auto flex w-64 border-b py-2.5 transition-colors"
        >
          <div className="text-gray300 flex w-full items-center justify-end gap-5 text-xl font-normal group-hover:font-semibold">
            등록하기
            <div className="border-gray300 group-hover:bg-gray100 flex size-9 items-center justify-center rounded-full border bg-white">
              <ArrowRight className="text-gray300" />
            </div>
          </div>
        </button>
      </form>
    </main>
  );
}

export default CreateProductPage;

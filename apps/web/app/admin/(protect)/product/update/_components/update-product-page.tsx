"use client";

import { CategoriesEnum } from "@humming-vision/shared";
import { ProductUpdateFormData } from "../_types/product-update.type";
import { useForm } from "react-hook-form";
import { CategorySection } from "./category-section";

interface UpdateProductPageProps {
  productId: number;
  category: CategoriesEnum;
  initialData: ProductUpdateFormData;
}

function UpdateProductPage({
  productId,
  initialData,
  category,
}: UpdateProductPageProps) {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    setFocus,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: initialData,
  });

  return (
    <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-60 md:px-10">
      <form onSubmit={handleSubmit(() => {})}>
        <hr className="border-gray200 absolute left-0 w-screen border-t" />
        <div className="border-main mb-5 border-b py-5.5 sm:gap-0">
          <h2 className="text-main text-2xl font-bold">제품수정</h2>
        </div>

        <CategorySection selectedCategory={category} />
      </form>
    </main>
  );
}

export default UpdateProductPage;

// "use client";
// import { useForm } from "react-hook-form";
// import { ArrowRight, Loader2 } from "lucide-react";
// import { useEffect } from "react";
// import { CategoriesEnum, Product } from "@humming-vision/shared";
// import {
//   getUpdateFormSchema,
//   createUpdateCompleteProductDto,
// } from "../_schemas/product-update.schema";
// import { sectionVisibility } from "../_const/constants";
// import { CategorySection } from "./category-section";
// import { InfoSection } from "./info-section";
// import { SpecSection } from "./spec-section";
// import { OtherInfoSection } from "./other-info-section";
// import {
//   ProductUpdateFormData,
//   LightProductUpdateFormData,
//   StandardProductUpdateFormData,
//   ProductUpdateApiData,
//   ValidatedLightProductUpdateData,
//   ValidatedStandardProductUpdateData,
// } from "../_types/product-update.type";
// import { protectApi } from "libs/axios";
// import { handleUpdateFormErrors } from "../_utils/form-error-handler";
// import { useMutation } from "@tanstack/react-query";
// import { showToast } from "utils/toast-config";
// import { urlToFile, urlsToFiles } from "../_utils/file-converter";

// interface ProductUpdateFormData {
//   category: CategoriesEnum;
//   name: string;
//   productImages: File[];
//   specImages: File[];
//   datasheetFile?: File;
//   drawingFile?: File;
//   manualFile?: File;
//   catalogFile?: File;
//   categoryFields: Record<string, string>;
// }

// interface UpdateProductPageProps {
//   initialData: ProductUpdateFormData;
//   productId: number;
//   category: CategoriesEnum;
// }

// function UpdateProductPage({
//   initialData,
//   productId,
//   category,
// }: UpdateProductPageProps) {
//   const selectedCategory = category;
//   const schema = getUpdateFormSchema(selectedCategory);

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//     setError,
//   } = useForm<ProductUpdateFormData>({
//     resolver: async (data) => {
//       const result = await schema.safeParseAsync(data);
//       if (!result.success) {
//         return {
//           values: {},
//           errors: result.error.flatten().fieldErrors as Record<
//             string,
//             string[]
//           >,
//         };
//       }
//       return { values: result.data, errors: {} };
//     },
//     mode: "onChange",
//   });

//   // 초기 데이터를 폼에 설정
//   useEffect(() => {
//     if (initialData) {
//       const convertAndSetFormData = async () => {
//         const transformedData = await transformProductToFormData(initialData);
//         reset(transformedData);
//       };
//       convertAndSetFormData();
//     }
//   }, [initialData, reset]);

//   // API 업데이트 뮤테이션
//   const updateMutation = useMutation({
//     mutationFn: async (data: ProductUpdateApiData) => {
//       console.log("Updating product with data:", data);

//       const response = await protectApi.patch(
//         `/api/product/update/${productId}`,
//         data,
//       );

//       return response.data;
//       //   const endpoint =
//       //     selectedCategory === CategoriesEnum.LIGHT
//       //       ? "/product/light"
//       //       : `/product/${selectedCategory.toLowerCase()}`;

//       //   const response = await protectApi.put(`${endpoint}/${productId}`, data);
//       //   return response.data;
//     },
//     onSuccess: () => {
//       showToast.success("제품이 성공적으로 수정되었습니다.");
//     },
//     onError: (error: unknown) => {
//       handleUpdateFormErrors(error as Error, setError, () => {});
//     },
//   });

//   const onSubmit = async (data: ProductUpdateFormData) => {
//     try {
//       // 파일 업로드 함수들
//       const uploadImages = async (
//         images: (File | string)[],
//       ): Promise<string[]> => {
//         const results = await Promise.all(
//           images.map(async (image) => {
//             if (typeof image === "string") {
//               return image; // 이미 URL인 경우 그대로 반환
//             }
//             const formData = new FormData();
//             formData.append("files", image);
//             const response = await protectApi.post<string[]>(
//               "/api/uploads/images",
//               formData,
//             );
//             return response.data[0] || "";
//           }),
//         );
//         return results.filter((url): url is string => !!url);
//       };

//       const uploadDocument = async (file: File | string): Promise<string> => {
//         if (typeof file === "string") {
//           return file; // 이미 URL인 경우 그대로 반환
//         }
//         const formData = new FormData();
//         formData.append("file", file);
//         const response = await protectApi.post(
//           "/api/uploads/documents",
//           formData,
//         );
//         return response.data.url;
//       };

//       const validatedData = await schema.parseAsync(data);

//       if (selectedCategory === CategoriesEnum.LIGHT) {
//         const lightData = validatedData as ValidatedLightProductUpdateData;

//         // 카탈로그 파일 업로드 (필요한 경우)
//         let catalogUrl;
//         if (lightData.catalogFile) {
//           catalogUrl = await uploadDocument(lightData.catalogFile);
//         }

//         const dto = await createUpdateCompleteProductDto({
//           ...lightData,
//           catalogFile: catalogUrl,
//         } as unknown as ProductUpdateApiData);

//         await updateMutation.mutateAsync(
//           dto as unknown as ProductUpdateApiData,
//         );
//       } else {
//         const standardData =
//           validatedData as ValidatedStandardProductUpdateData;

//         // 모든 파일들 병렬로 업로드
//         const [
//           productImageUrls,
//           specImageUrls,
//           datasheetUrl,
//           drawingUrl,
//           manualUrl,
//         ] = await Promise.all([
//           uploadImages(standardData.productImages),
//           uploadImages(standardData.specImages),
//           standardData.datasheetFile
//             ? uploadDocument(standardData.datasheetFile)
//             : Promise.resolve(null),
//           standardData.drawingFile
//             ? uploadDocument(standardData.drawingFile)
//             : Promise.resolve(null),
//           standardData.manualFile
//             ? uploadDocument(standardData.manualFile)
//             : Promise.resolve(null),
//         ]);

//         const dataWithUrls = {
//           ...standardData,
//           productImages: productImageUrls,
//           specImages: specImageUrls,
//           datasheetFile: datasheetUrl,
//           drawingFile: drawingUrl,
//           manualFile: manualUrl,
//         } as unknown as ProductUpdateApiData;

//         const dto = await createUpdateCompleteProductDto(dataWithUrls);
//         await updateMutation.mutateAsync(
//           dto as unknown as ProductUpdateApiData,
//         );
//       }
//     } catch (error) {
//       console.error("Form submission error:", error);
//       handleUpdateFormErrors(error, setError, () => {});
//     }
//   };

//   // 제품 데이터를 폼 데이터로 변환하는 함수
//   const transformProductToFormData = async (
//     product: Product,
//   ): Promise<ProductUpdateFormData> => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const productAny = product as any;

//     if (productAny.categories === "LIGHT") {
//       let catalogFile: File | string | undefined = undefined;
//       if (productAny.catalogUrl) {
//         try {
//           catalogFile = await urlToFile(productAny.catalogUrl);
//         } catch {
//           catalogFile = productAny.catalogUrl; // fallback to URL
//         }
//       }

//       return {
//         id: productAny.id,
//         category: CategoriesEnum.LIGHT,
//         name: productAny.name,
//         catalogFile,
//         categoryFields: productAny.light || {},
//       } as LightProductUpdateFormData;
//     } else {
//       // Product images 변환
//       const productImageUrls: string[] =
//         productAny.images
//           ?.filter(
//             (img: { type: string; path: string }) => img.type === "PRODUCT",
//           )
//           ?.map((img: { path: string }) => img.path) || [];

//       // Spec images 변환
//       const specImageUrls: string[] =
//         productAny.images
//           ?.filter((img: { type: string; path: string }) => img.type === "SPEC")
//           ?.map((img: { path: string }) => img.path) || [];

//       const [productFiles, specFiles, datasheetFile, drawingFile, manualFile] =
//         await Promise.allSettled([
//           urlsToFiles(productImageUrls),
//           urlsToFiles(specImageUrls),
//           productAny.datasheetUrl
//             ? urlToFile(productAny.datasheetUrl).catch(
//                 () => productAny.datasheetUrl,
//               )
//             : undefined,
//           productAny.drawingUrl
//             ? urlToFile(productAny.drawingUrl).catch(
//                 () => productAny.drawingUrl,
//               )
//             : undefined,
//           productAny.manualUrl
//             ? urlToFile(productAny.manualUrl).catch(() => productAny.manualUrl)
//             : undefined,
//         ]);

//       return {
//         id: productAny.id,
//         category: productAny.categories as CategoriesEnum,
//         name: productAny.name,
//         subCategory: productAny.subCategory || "",
//         mainFeature: productAny.mainFeature || "",
//         productImages:
//           productFiles.status === "fulfilled"
//             ? productFiles.value
//             : productImageUrls,
//         specImages:
//           specFiles.status === "fulfilled" ? specFiles.value : specImageUrls,
//         datasheetFile:
//           datasheetFile.status === "fulfilled"
//             ? datasheetFile.value
//             : undefined,
//         drawingFile:
//           drawingFile.status === "fulfilled" ? drawingFile.value : undefined,
//         manualFile:
//           manualFile.status === "fulfilled" ? manualFile.value : undefined,
//         categoryFields: productAny[productAny.categories?.toLowerCase()] || {},
//       } as StandardProductUpdateFormData;
//     }
//   };

//   return (
//     <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-60 md:px-10">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <hr className="border-gray200 absolute left-0 w-screen border-t" />
//         <div className="border-main mb-5 border-b py-5.5 sm:gap-0">
//           <h2 className="text-main text-2xl font-bold">제품수정</h2>
//         </div>

//         {/* Category Section */}
//         <CategorySection selectedCategory={selectedCategory} />

//         {/* Info Section */}
//         <InfoSection control={control} selectedCategory={selectedCategory} />

//         {/* Spec Section */}
//         {sectionVisibility[selectedCategory].specSection && (
//           <SpecSection control={control} />
//         )}

//         {/* Other Info Section */}
//         {sectionVisibility[selectedCategory].otherInfoSection && (
//           <OtherInfoSection
//             control={control}
//             selectedCategory={selectedCategory}
//           />
//         )}

//         <button
//           type="submit"
//           disabled={isSubmitting || updateMutation.isPending}
//           className="group border-gray300 ml-auto flex w-64 border-b py-2.5 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           <div className="text-gray300 flex w-full items-center justify-end gap-5 text-xl font-normal group-hover:font-semibold">
//             수정하기
//             <div className="border-gray300 group-hover:bg-gray100 flex size-9 items-center justify-center rounded-full border bg-white">
//               {isSubmitting || updateMutation.isPending ? (
//                 <Loader2 className="text-gray300 h-4 w-4 animate-spin" />
//               ) : (
//                 <ArrowRight className="text-gray300" />
//               )}
//             </div>
//           </div>
//         </button>
//       </form>
//     </main>
//   );
// }

// export default UpdateProductPage;

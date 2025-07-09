import {
  CategoryRelationMapKebab,
  Product,
  CategoriesEnum,
  CategoryRelationMap,
  GetLightResponse,
} from "@humming-vision/shared";
import axios from "axios";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import UpdateProductPage from "./_components/update-product-page";
import { ProductUpdateFormData } from "./_types/product-update.type";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

async function page({ searchParams }: Props) {
  const { id, category } = await searchParams;

  if (!id || !category) {
    throw new Error("Product ID and category are required");
  }

  const kebabCategory =
    CategoryRelationMapKebab[category as keyof typeof CategoriesEnum];

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  const response = await axios.get<Product>(
    `${END_POINT}/product/${kebabCategory}/${id}`,
  );

  const categoryData =
    response.data[CategoryRelationMap[category as CategoriesEnum]];
  const categoryId = categoryData?.id;

  if (!categoryId) {
    throw new Error(`Category data not found for category: ${category}`);
  }

  const initialData = await transformProductToFormData(response.data);

  return (
    <UpdateProductPage
      initialData={initialData}
      categoryId={categoryId}
      productId={parseInt(id)}
      category={category as CategoriesEnum}
    />
  );
}

const transformProductToFormData = async (
  product: Product,
): Promise<ProductUpdateFormData> => {
  if (product.categories === "LIGHT") {
    const lightProduct = product.light as GetLightResponse;

    return {
      category: CategoriesEnum.LIGHT,
      name: product.name,
      productImages: [],
      specImages: [],
      catalogFileUrl: lightProduct.catalogUrl,
      categoryFields: {},
    };
  } else {
    const productImageUrls: string[] =
      product.images
        ?.filter(
          (img: { type: string; path: string }) => img.type === "PRODUCT",
        )
        ?.map((img: { path: string }) => img.path) || [];

    const specImageUrls: string[] =
      product.images
        ?.filter((img: { type: string; path: string }) => img.type === "SPEC")
        ?.map((img: { path: string }) => img.path) || [];

    const categoryRelatedData =
      product[CategoryRelationMap[product.categories]];
    const categoryFields: Record<string, string> = {};

    if (categoryRelatedData && typeof categoryRelatedData === "object") {
      Object.entries(categoryRelatedData).forEach(([key, value]) => {
        if (
          key !== "id" &&
          key !== "product" &&
          value !== null &&
          value !== undefined
        ) {
          categoryFields[key] = String(value);
        }
      });
    }

    return {
      category: product.categories as CategoriesEnum,
      name: product.name,
      mainFeature: product.mainFeature,

      productImages: [],
      specImages: [],
      datasheetFile: undefined,
      drawingFile: undefined,
      manualFile: undefined,

      productImageUrls,
      specImageUrls,
      datasheetUrl: product.datasheetUrl || undefined,
      drawingUrl: product.drawingUrl || undefined,
      manualUrl: product.manualUrl || undefined,
      categoryFields,
    };
  }
};

export default page;

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
import { urlsToFiles, urlToFile } from "./_utils/file-converter";
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

  const initialData = await transformProductToFormData(response.data);

  return (
    <UpdateProductPage
      initialData={initialData}
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

    const catalogFile = await urlToFile(lightProduct.catalogUrl);

    return {
      category: CategoriesEnum.LIGHT,
      name: product.name,
      productImages: [],
      specImages: [],
      catalogFile,
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

    const [productFiles, specFiles, datasheetFile, drawingFile, manualFile] =
      await Promise.allSettled([
        urlsToFiles(productImageUrls),
        urlsToFiles(specImageUrls),
        product.datasheetUrl
          ? urlToFile(product.datasheetUrl)
          : Promise.resolve(undefined),
        product.drawingUrl
          ? urlToFile(product.drawingUrl)
          : Promise.resolve(undefined),
        product.manualUrl
          ? urlToFile(product.manualUrl)
          : Promise.resolve(undefined),
      ]);

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
      productImages:
        productFiles.status === "fulfilled" ? productFiles.value : [],
      specImages: specFiles.status === "fulfilled" ? specFiles.value : [],
      datasheetFile:
        datasheetFile.status === "fulfilled" ? datasheetFile.value : undefined,
      drawingFile:
        drawingFile.status === "fulfilled" ? drawingFile.value : undefined,
      manualFile:
        manualFile.status === "fulfilled" ? manualFile.value : undefined,
      categoryFields,
    };
  }
};

export default page;

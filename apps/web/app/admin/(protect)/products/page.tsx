import { CategoryRelationMapKebab } from "@humming-vision/shared";
import ProductsPage from "./_components/products-page";
import { z } from "zod";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export const ProductSearchParamsSchema = z.object({
  category: z
    .nativeEnum(CategoryRelationMapKebab)
    .default(CategoryRelationMapKebab.CAMERA),
  page: z.coerce.number().int().min(1).default(1),
  searchValue: z.string().default(""),
});

export type ProductSearchParams = {
  category: CategoryRelationMapKebab;
  page: number;
  searchValue: string;
};

export function safeParseProductSearchParams(
  searchParams: Record<string, string | undefined>,
): ProductSearchParams {
  const result = ProductSearchParamsSchema.safeParse(searchParams);

  if (result.success) {
    return result.data;
  }

  return {
    category: CategoryRelationMapKebab.CAMERA,
    page: 1,
    searchValue: "",
  };
}

async function page({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const validatedParams: ProductSearchParams =
    safeParseProductSearchParams(resolvedSearchParams);

  return <ProductsPage {...validatedParams} />;
}

export default page;

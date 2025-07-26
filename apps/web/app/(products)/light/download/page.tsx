import {
  CategoriesEnum,
  GetLightQuery,
  GetProductResponse,
} from "@humming-vision/shared";
import axios from "axios";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { TAKE } from "@/(products)/_constants/paginate.const";
import { z } from "zod";
import { buildValidatedQuery } from "@/(products)/_util/build-validate-query";
import { handleApiError } from "utils/api-error-handler";
import EmptyProductState from "@/(products)/_components/empty-product-state";
import LightProductTable from "./light-product-table";

type Props = {
  searchParams: Promise<GetLightQuery>;
};

const GetLightQuerySchema = z.object({
  where__name__i_like: z.string().optional(),
  page: z.preprocess((v) => Number(v), z.number().min(1)).optional(),
  take: z.preprocess((v) => Number(v), z.number().min(1)).optional(),
});

async function page({ searchParams: initSearchParams }: Props) {
  const searchParams = await initSearchParams;

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  const validatedQuery = buildValidatedQuery(
    {
      ...searchParams,
      page: String(searchParams.page || 1),
      take: String(TAKE),
    },
    GetLightQuerySchema,
  );

  try {
    const lightData = await axios.get<GetProductResponse<CategoriesEnum.LIGHT>>(
      `${END_POINT}/product/light?${validatedQuery.toString()}`,
      {
        adapter: "fetch",
        fetchOptions: {
          cache: "force-cache",
          next: {
            revalidate: 3600,
          },
        },
      },
    );

    if (lightData.data.data.length === 0) {
      return <EmptyProductState />;
    }

    return (
      <LightProductTable
        productsData={lightData.data}
        searchParams={searchParams}
      />
    );
  } catch (error) {
    handleApiError(error);
  }
}

export default page;

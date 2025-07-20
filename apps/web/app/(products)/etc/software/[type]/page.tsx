import EmptyProductState from "@/(products)/_components/empty-product-state";
import { TAKE } from "@/(products)/_constants/paginate.const";
import { buildValidatedQuery } from "@/(products)/_util/build-validate-query";
import {
  CategoriesEnum,
  GetProductResponse,
  GetSoftwareQuery,
} from "@humming-vision/shared";
import axios from "axios";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { handleApiError } from "utils/api-error-handler";
import { z } from "zod";
import SoftwareProductTable from "./software-product-table";
import ETCFilter from "components/products-filter/etc-filter";

type Props = {
  searchParams: Promise<GetSoftwareQuery>;
  params: { type: string };
};

const GetSoftwareQuerySchema = z.object({
  software__maker__equal: z.enum(["MATROX", "EURESYS"]).optional(),
  where__name__i_like: z.string().optional(),
  page: z.preprocess((v) => Number(v), z.number().min(1)).optional(),
  take: z.preprocess((v) => Number(v), z.number().min(1)).optional(),
});

async function page({ searchParams: initSearchParams, params }: Props) {
  const searchParams = await initSearchParams;
  const { type } = await params;

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  const validatedQuery = buildValidatedQuery(
    {
      ...searchParams,
      software__maker__equal: type.toUpperCase(),
      page: String(searchParams.page || 1),
      take: String(TAKE),
    },
    GetSoftwareQuerySchema,
  );

  try {
    const softwareData = await axios.get<
      GetProductResponse<CategoriesEnum.SOFTWARE>
    >(`${END_POINT}/product/software?${validatedQuery.toString()}`, {
      adapter: "fetch",
      fetchOptions: {
        cache: "force-cache",
        next: {
          revalidate: 3600,
        },
      },
    });

    if (softwareData.data.data.length === 0) {
      return <EmptyProductState />;
    }

    return (
      <SoftwareProductTable
        productsData={softwareData.data}
        searchParams={searchParams}
      />
    );
  } catch (error) {
    handleApiError(error);
  }
}

export default page;

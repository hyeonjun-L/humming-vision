import {
  CategoriesEnum,
  GetLensQuery,
  GetProductResponse,
} from "@humming-vision/shared";
import axios from "axios";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { TAKE } from "@/(products)/_constants/paginate.const";
import { z } from "zod";
import { buildValidatedQuery } from "@/(products)/_util/build-validate-query";
import { handleApiError } from "utils/api-error-handler";
import EmptyProductState from "@/(products)/_components/empty-product-state";
import LensProductTable from "./lens-product-table";
import { redirect } from "next/navigation";
import { RoutePath, RoutePathWithCategory } from "consts/route.const";

type Props = {
  searchParams: Promise<GetLensQuery>;
  params: { type: string };
};

const GetLensQuerySchema = z.object({
  lens__mount__equal: z.enum(["C", "CS", "F", "M"]).optional(),
  lens__focalLength__between: z.array(z.number()).length(2).optional(),
  lens__formatSize__between: z.array(z.number()).length(2).optional(),
  lens__type__equal: z.enum(["CCTV", "TCL"]).optional(),
  where__name__i_like: z.string().optional(),
  page: z.preprocess((v) => Number(v), z.number().min(1)).optional(),
  take: z.preprocess((v) => Number(v), z.number().min(1)).optional(),
});

async function page({ searchParams: initSearchParams, params }: Props) {
  const searchParams = await initSearchParams;
  const { type } = await params;

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  try {
    z.enum(["CCTV", "TCL"]).parse(type.toUpperCase());
  } catch {
    redirect(`${RoutePath.LENS}${RoutePathWithCategory.CCTV}`);
  }

  const validatedQuery = buildValidatedQuery(
    {
      ...searchParams,
      lens__type__equal: type.toUpperCase(),
      page: String(searchParams.page || 1),
      take: String(TAKE),
    },
    GetLensQuerySchema,
  );

  try {
    const lensData = await axios.get<GetProductResponse<CategoriesEnum.LENS>>(
      `${END_POINT}/product/lens?${validatedQuery.toString()}`,
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

    if (lensData.data.data.length === 0) {
      return <EmptyProductState />;
    }

    return (
      <LensProductTable
        productsData={lensData.data}
        searchParams={searchParams}
      />
    );
  } catch (error) {
    handleApiError(error);
  }
}

export default page;

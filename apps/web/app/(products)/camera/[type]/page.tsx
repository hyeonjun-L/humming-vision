import {
  CategoriesEnum,
  GetCameraQuery,
  GetProductResponse,
} from "@humming-vision/shared";
import CameraProductTable from "./camera-product-table";
import axios from "axios";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { TAKE } from "@/(products)/_constants/paginate.const";
import { z } from "zod";
import { buildValidatedQuery } from "@/(products)/_util/build-validate-query";
import { handleApiError } from "utils/api-error-handler";
import EmptyProductState from "@/(products)/_components/empty-product-state";
import { redirect } from "next/navigation";
import { RoutePath, RoutePathWithCategory } from "consts/route.const";

type Props = {
  searchParams: Promise<GetCameraQuery>;
  params: Promise<{ type: string }>;
};

const GetCameraQuerySchema = z.object({
  camera__type__equal: z.enum(["LINE", "AREA"]),
  camera__maker__equal: z
    .enum(["CREVIS", "VIEWORKS", "BASLER", "HIK", "HUARAY", "JAI"])
    .optional(),
  _camera__resolution__between: z.array(z.number()).length(2).optional(),
  camera__speed__between: z.array(z.number()).length(2).optional(),
  camera__interface__equal: z
    .enum(["GIGE", "USB", "CAMERA_LINK", "COAXPRESS"])
    .optional(),
  where__name__i_like: z.string().optional(),
  page: z.preprocess((v) => Number(v), z.number().min(1)).optional(),
  take: z.preprocess((v) => Number(v), z.number().min(1)).optional(),
});

async function page({ searchParams: initSearchParams, params }: Props) {
  const searchParams = await initSearchParams;
  const { type } = await params;

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  try {
    z.enum(["LINE", "AREA"]).parse(type.toUpperCase());
  } catch {
    redirect(`${RoutePath.CAMERA}${RoutePathWithCategory.AREA}`);
  }

  const validatedQuery = buildValidatedQuery(
    {
      ...searchParams,
      camera__type__equal: type.toUpperCase(),
      page: String(searchParams.page || 1),
      take: String(TAKE),
    },
    GetCameraQuerySchema,
  );

  try {
    const cameraData = await axios.get<
      GetProductResponse<CategoriesEnum.CAMERA>
    >(`${END_POINT}/product/camera?${validatedQuery.toString()}`, {
      adapter: "fetch",
      fetchOptions: {
        cache: "force-cache",
        next: {
          revalidate: 3600,
        },
      },
    });

    if (cameraData.data.data.length === 0) {
      return <EmptyProductState />;
    }

    return (
      <CameraProductTable
        productsData={cameraData.data}
        searchParams={searchParams}
      />
    );
  } catch (error) {
    handleApiError(error);
  }
}

export default page;

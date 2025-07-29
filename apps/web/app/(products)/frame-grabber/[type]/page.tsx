import {
  CategoriesEnum,
  GetFrameGrabberQuery,
  GetProductResponse,
} from "@humming-vision/shared";
import axios from "axios";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { TAKE } from "@/(products)/_constants/paginate.const";
import { z } from "zod";
import { buildValidatedQuery } from "@/(products)/_util/build-validate-query";
import { handleApiError } from "utils/api-error-handler";
import EmptyProductState from "@/(products)/_components/empty-product-state";
import FrameGrabberProductTable from "./frame-grabber-product-table";
import { redirect } from "next/navigation";
import { RoutePath, RoutePathWithCategory } from "consts/route.const";

type Props = {
  searchParams: Promise<GetFrameGrabberQuery>;
  params: Promise<{ type: string }>;
};

export const dynamic = "force-dynamic";

const GetFrameGrabberQuerySchema = z.object({
  frameGrabber__maker__equal: z
    .enum(["MATROX", "EURESYS", "ADLINK", "BASLER"])
    .optional(),
  frameGrabber__interface__equal: z
    .enum(["GIGE", "USB", "CAMERA_LINK", "COAXPRESS"])
    .optional(),
  where__name__i_like: z.string().optional(),
  page: z.preprocess((v) => Number(v), z.number().min(1)).optional(),
  take: z.preprocess((v) => Number(v), z.number().min(1)).optional(),
});

async function page({ searchParams: initSearchParams, params }: Props) {
  const searchParams = await initSearchParams;
  const { type } = await params;

  const typeProcessed = type === "link" ? "CAMERA_LINK" : type.toUpperCase();

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  try {
    z.enum(["GIGE", "USB", "CAMERA_LINK", "COAXPRESS"]).parse(
      typeProcessed.toUpperCase(),
    );
  } catch {
    redirect(`${RoutePath.FRAMEGRABBER}${RoutePathWithCategory.COAXPRESS}`);
  }

  const validatedQuery = buildValidatedQuery(
    {
      ...searchParams,
      frameGrabber__interface__equal: typeProcessed,
      page: String(searchParams.page || 1),
      take: String(TAKE),
    },
    GetFrameGrabberQuerySchema,
  );

  try {
    const frameGrabberData = await axios.get<
      GetProductResponse<CategoriesEnum.FRAMEGRABBER>
    >(`${END_POINT}/product/frame-grabber?${validatedQuery.toString()}`, {
      adapter: "fetch",
      fetchOptions: {
        cache: "force-cache",
        next: {
          revalidate: 3600,
        },
      },
    });

    if (frameGrabberData.data.data.length === 0) {
      return <EmptyProductState />;
    }

    return (
      <FrameGrabberProductTable
        productsData={frameGrabberData.data}
        searchParams={searchParams}
      />
    );
  } catch (error) {
    handleApiError(error);
  }
}

export default page;

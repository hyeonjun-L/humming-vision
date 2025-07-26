import Detail from "@/(product)/_components/detail";
import { FrameGrabberProduct } from "@humming-vision/shared";
import axios from "axios";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { handleApiError } from "utils/api-error-handler";

type Props = {
  params: Promise<{ id: string }>;
};

async function page({ params }: Props) {
  const { id } = await params;

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  try {
    const lensData = await axios.get<FrameGrabberProduct>(
      `${END_POINT}/product/frame-grabber/${id}`,
      {
        adapter: "fetch",
        fetchOptions: {
          next: {
            revalidate: 3600,
          },
          cache: "force-cache",
        },
      },
    );

    return <Detail product={lensData.data} />;
  } catch (error) {
    handleApiError(error);
  }
}

export default page;

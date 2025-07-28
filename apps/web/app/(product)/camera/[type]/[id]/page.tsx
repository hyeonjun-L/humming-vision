import Detail from "@/(product)/_components/detail";
import { handleApiError } from "utils/api-error-handler";
import { getCameraProduct } from "./get-camera-product";

type Props = {
  params: Promise<{ id: string }>;
};

async function page({ params }: Props) {
  const { id } = await params;

  try {
    const product = await getCameraProduct(id);

    return <Detail product={product} />;
  } catch (error) {
    handleApiError(error);
  }
}

export default page;

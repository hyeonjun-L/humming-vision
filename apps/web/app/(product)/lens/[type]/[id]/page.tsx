import Detail from "@/(product)/_components/detail";
import { handleApiError } from "utils/api-error-handler";
import { getLensProduct } from "./get-lens-product";

type Props = {
  params: Promise<{ id: string }>;
};

async function page({ params }: Props) {
  const { id } = await params;

  try {
    const product = await getLensProduct(id);

    return <Detail product={product} />;
  } catch (error) {
    handleApiError(error);
  }
}

export default page;

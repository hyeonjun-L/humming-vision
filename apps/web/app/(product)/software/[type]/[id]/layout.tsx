import { Metadata } from "next";
import { handleApiError } from "utils/api-error-handler";
import { DEFAULT_DESCRIPTION, SITE_TITLE } from "consts/metadata.const";
import { getSoftwareProduct } from "./get-software-product";

type Props = {
  params: Promise<{ type: string; id: string }>;
};

// TODO: 중복코드 제거
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, type } = await params;

  try {
    const product = await getSoftwareProduct(id);

    return {
      title: `${product.name} | ${SITE_TITLE}`,
      description: product.mainFeature || DEFAULT_DESCRIPTION,
      openGraph: {
        title: `${product.name} | ${SITE_TITLE}`,
        description: product.mainFeature || DEFAULT_DESCRIPTION,
        url: `https://hummingvision.com/software/${type}/${id}`,
        images: product.images
          .filter((img) => img.type === "PRODUCT")
          .map((img) => ({ url: img.path })),
        locale: "ko_KR",
        siteName: "허밍비젼",
      },
      alternates: {
        canonical: `https://hummingvision.com/software/${type}/${id}`,
      },
    };
  } catch (error) {
    handleApiError(error);
    return {
      title: "제품 상세 | 허밍비젼 HummingVision",
      description: "제품 정보를 불러오지 못했습니다.",
    };
  }
}

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export default layout;

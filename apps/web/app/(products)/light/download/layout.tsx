import { Metadata } from "next";

export const metadata: Metadata = {
  title: "허밍비전 | 머신비전 조명 카탈로그",
  description:
    "LVS, CCS 등 주요 조명 브랜드의 최신 카탈로그 및 제품 사양서 제공.",
  alternates: {
    canonical: "https://hummingvision.co.kr/camera/metrox",
  },
};

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export default layout;

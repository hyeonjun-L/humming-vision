import { Metadata } from "next";

export const metadata: Metadata = {
  title: "허밍비전 | 제품 및 기술 문의",
  description:
    "머신비전 제품 및 기술 문의. 빠른 응답과 전문적인 기술 상담 제공.",
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

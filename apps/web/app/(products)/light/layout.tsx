import { Metadata } from "next";

export const metadata: Metadata = {
  title: "허밍비전 | 머신비전 조명",
  description:
    "LVS, CCS 등 바, 링, 돔, 백라이트 등 다양한 형태의 산업용 머신비전 조명 솔루션 제공.",
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

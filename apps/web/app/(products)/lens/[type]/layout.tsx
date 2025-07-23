import { Metadata } from "next";

export const metadata: Metadata = {
  title: "허밍비전 | 머신비전 렌즈",
  description:
    "Computar, Muytron, SPO 등 다양한 초점거리와 배율의 머신비전 렌즈 제공. 고정밀 산업용 렌즈 솔루션 보유.",
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

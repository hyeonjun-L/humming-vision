import { Metadata } from "next";

export const metadata: Metadata = {
  title: "허밍비전 | 머신비전 액세서리",
  description:
    "케이블, 브라켓, 컨버터 등 안정적인 머신비전 시스템을 위한 다양한 액세서리 제공.",
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

import { Metadata, Viewport } from "next";

export function generateViewport(): Viewport {
  return {
    themeColor: "#00319b",
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "허밍비젼 | 머신비전 조명 카탈로그",
    description:
      "LVS, CCS 등 주요 조명 브랜드의 최신 카탈로그 및 제품 사양서 제공.",
    alternates: {
      canonical: "https://hummingvision.com/light/download",
    },
  };
}

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export default layout;

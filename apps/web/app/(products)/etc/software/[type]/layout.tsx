import { Metadata, Viewport } from "next";

type Props = {
  params: Promise<{ type: string }>;
};

export function generateViewport(): Viewport {
  return {
    themeColor: "#00319b",
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;

  return {
    title: "허밍비젼 | 머신비전 소프트웨어",
    description:
      "머신비전용 소프트웨어 및 이미지 분석 솔루션 제공. 다양한 하드웨어와의 연동 및 최적화 지원.",
    alternates: {
      canonical: `https://hummingvision.com/software/${type}`,
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

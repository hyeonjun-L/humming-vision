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
    title: "허밍비젼 | 머신비전 렌즈",
    description:
      "Computar, Muytron, SPO 등 다양한 초점거리와 배율의 머신비전 렌즈 제공. 고정밀 산업용 렌즈 솔루션 보유.",
    alternates: {
      canonical: `https://hummingvision.com/lens/${type}`,
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

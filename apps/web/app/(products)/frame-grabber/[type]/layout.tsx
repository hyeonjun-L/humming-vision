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
    title: "허밍비젼 | 프레임그래버",
    description:
      "CoaXPress, Camera Link 등 고속 영상 인터페이스 지원 프레임그래버 제공. 산업용 영상 처리에 최적화된 솔루션.",
    alternates: {
      canonical: `https://hummingvision.com/frame-grabber/${type}`,
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

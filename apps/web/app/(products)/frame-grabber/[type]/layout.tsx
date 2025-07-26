import { Metadata } from "next";

export const metadata: Metadata = {
  title: "허밍비전 | 프레임그래버",
  description:
    "CoaXPress, Camera Link 등 고속 영상 인터페이스 지원 프레임그래버 제공. 산업용 영상 처리에 최적화된 솔루션.",
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

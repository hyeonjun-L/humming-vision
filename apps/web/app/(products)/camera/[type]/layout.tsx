import { Metadata } from "next";

type Props = {
  params: Promise<{ type: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;

  return {
    title: "허밍비젼 | 머신비전 카메라",
    description:
      "Basler, Crevis, Hikrobot, Vieworks 등 고해상도·고속 인터페이스 산업용 카메라 제공. 다양한 해상도와 인터페이스 라인업 보유.",
    alternates: {
      canonical: `https://hummingvision.com/camera/${type}`,
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

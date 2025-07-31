import { Metadata } from "next";

type Props = {
  params: Promise<{ type: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;

  return {
    title: "허밍비젼 | 머신비전 액세서리",
    description:
      "케이블, 브라켓, 컨버터 등 안정적인 머신비전 시스템을 위한 다양한 액세서리 제공.",
    alternates: {
      canonical: `https://hummingvision.com/accessory/${type}`,
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

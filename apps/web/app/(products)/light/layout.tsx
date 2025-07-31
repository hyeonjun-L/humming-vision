import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "허밍비젼 | 머신비전 조명",
    description:
      "LVS, CCS 등 바, 링, 돔, 백라이트 등 다양한 형태의 산업용 머신비전 조명 솔루션 제공.",
    alternates: {
      canonical: `https://hummingvision.com/light`,
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

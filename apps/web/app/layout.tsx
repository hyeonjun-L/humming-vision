import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import Header from "./_components/header/header";
import ModalRoot from "./_components/modal-root";
import { QueryProvider } from "providers/query.provider";
import { ToastContainer } from "react-toastify";
import Footer from "./_components/footer";
import Head from "next/head";

const notoSansKRFont = Noto_Sans_KR({
  display: "fallback",
  variable: "--font-sans",
  subsets: ["latin"],
});

const gothamBookFont = localFont({
  src: "./font/gotham-book.otf",
  variable: "--font-gotham-book",
});

const gothamBoldFont = localFont({
  src: "./font/gotham-bold.otf",
  variable: "--font-gotham-bold",
});

export const viewport: Viewport = {
  themeColor: "#00319b",
};

export const metadata: Metadata = {
  verification: {
    other: {
      "naver-site-verification": "6b4d15cd5dba94c6d6813bd8848ddbc9f197db40",
    },
    google: "qY1XqMLSzVUqvMZy1DsXeep_6eAk9fCZNZgW7zo7hRM",
  },
  title: "주식회사 허밍비젼 HummingVision | 머신비전 하드웨어 전문기업",
  description:
    "크래비스, 바슬러, 콤퓨타, LVS등 글로벌 브랜드 머신비전 카메라, 렌즈, 조명을 공급하는 전문 기업 머신비전 하드웨어 솔루션의 최적 파트너",
  metadataBase: new URL("https://hummingvision.com"),
  openGraph: {
    title: "주식회사 허밍비젼 HummingVision | 머신비전 하드웨어 전문기업",
    description: "산업용 머신비전 분야에 혁신적인 시각 솔루션을 제공합니다.",
    url: "https://hummingvision.com/",
    type: "website",
    images: [
      {
        url: "https://www.hummingvision.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-banner-1.56f02c00.jpg&w=3840&q=75",
        width: 1200,
        height: 630,
        alt: "허밍비젼 OG 이미지",
      },
    ],
    siteName: "허밍비젼",
    locale: "ko_KR",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://hummingvision.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${gothamBookFont.variable} ${notoSansKRFont.variable} ${gothamBoldFont.variable} font-sans`}
      >
        <ToastContainer />
        <QueryProvider>
          <ModalRoot />
          <Header />
          {children}
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}

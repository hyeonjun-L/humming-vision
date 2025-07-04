import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import Header from "./_components/header/header";
import ModalRoot from "./_components/modal-root";
import { QueryProvider } from "providers/query.provider";
import { ToastContainer } from "react-toastify";

const notoSansKRFont = Noto_Sans_KR({
  display: "fallback",
  variable: "--font-sans",
  subsets: ["latin"],
});

const gothamBookFont = localFont({
  src: "./font/gotham-book.otf",
  variable: "--font-gotham-book",
});

export const metadata: Metadata = {
  title: "허밍비전(주) | 혁신적인 머신비전 시각 솔루션",
  description:
    "허밍비전(주)은 산업용 머신비전 분야에 혁신적인 시각 솔루션을 제공합니다. 고객 맞춤형 시스템, 신뢰할 수 있는 기술력, 차별화된 서비스를 경험하세요.",
  keywords: [
    "허밍비전",
    "머신비전",
    "AI",
    "시각 솔루션",
    "스마트팩토리",
    "영상 분석",
    "산업용 카메라",
    "프레임그래버",
    "딥러닝",
    "비전 검사",
  ],
  metadataBase: new URL("https://hummingvision.co.kr"),
  openGraph: {
    title: "허밍비전(주) | 혁신적인 머신비전 시각 솔루션",
    description: "산업용 머신비전 분야에 혁신적인 시각 솔루션을 제공합니다.",
    url: "https://hummingvision.co.kr/",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "허밍비전(주) OG 이미지",
      },
    ],
    siteName: "허밍비전(주)",
    locale: "ko_KR",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: "https://hummingvision.co.kr/",
    languages: {
      ko: "https://hummingvision.co.kr/",
    },
  },
  category: "technology",
  applicationName: "허밍비전(주)",
  authors: [{ name: "허밍비전(주)", url: "https://hummingvision.co.kr" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${gothamBookFont.variable} ${notoSansKRFont.variable}`}>
        <ToastContainer />
        <QueryProvider>
          <ModalRoot />
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}

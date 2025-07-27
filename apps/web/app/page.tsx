import Script from "next/script";
import Contact from "./_components/contact/contact";
import MainBanner from "./_components/main-banner";
import Product from "./_components/product";
import { ENV_NAVER_CLIENT_ID_KEY } from "consts/env-keys.const";

declare global {
  interface Window {
    naver: typeof naver;
  }
}

export default function Home() {
  console.log("직접:", process.env.NEXT_PUBLIC_NAVER_CLIENT_ID);
  console.log("키로:", process.env[ENV_NAVER_CLIENT_ID_KEY]);

  return (
    <main>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
      />
      <MainBanner />
      <Product />
      <Contact />
    </main>
  );
}

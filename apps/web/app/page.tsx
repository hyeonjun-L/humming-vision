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
  return (
    <main>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env[ENV_NAVER_CLIENT_ID_KEY]}`}
      />
      <MainBanner />
      <Product />
      <Contact />
    </main>
  );
}

import Script from "next/script";
import Contact from "./_components/contact/contact";
import MainBanner from "./_components/main-banner";
import Product from "./_components/product";

declare global {
  interface Window {
    naver: typeof naver;
  }
}

export default function Home() {
  return (
    <main>
      <Script src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=k335jc0ytd" />
      <MainBanner />
      <Product />
      <Contact />
    </main>
  );
}

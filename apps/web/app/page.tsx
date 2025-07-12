import Contact from "./_components/contact/contact";
import MainBanner from "./_components/main-banner";
import Product from "./_components/product";

export default function Home() {
  return (
    <main>
      <MainBanner />
      <Product />
      <Contact />
    </main>
  );
}

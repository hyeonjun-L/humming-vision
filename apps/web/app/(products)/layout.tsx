import ProductsFilter from "components/products-filter/products-filter";
import Banner from "./_components/banner";
import TypeNav from "./_components/type-nav";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mt-32 w-full">
      <Banner />

      <section className="relative mr-54 flex justify-center">
        <div className="sticky top-0 mr-5 h-fit w-52 pt-48">
          <h3 className="text-gray600 mb-5 text-2xl font-bold">상세 검색</h3>
          <ProductsFilter />
        </div>

        <div className="flex w-full max-w-screen-lg flex-col items-center border-l border-gray-200">
          <TypeNav />
          {children}
        </div>
      </section>
    </main>
  );
}

export default layout;

import Banner from "./_components/banner";
import DetailedSearch from "./_components/detailed-search";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mt-32 w-full">
      <Banner />

      <DetailedSearch>{children}</DetailedSearch>
    </main>
  );
}

export default layout;

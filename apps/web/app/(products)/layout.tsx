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

      <DetailedSearch>
        <div className="w-full max-w-[1119px]">{children}</div>
      </DetailedSearch>
    </main>
  );
}

export default layout;

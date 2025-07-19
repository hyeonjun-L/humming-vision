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
        <div className="border-main w-full max-w-[1119px] border-t">
          {children}
        </div>
      </DetailedSearch>
    </main>
  );
}

export default layout;

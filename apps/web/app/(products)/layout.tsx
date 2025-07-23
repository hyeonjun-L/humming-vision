import FullPageSpinner from "components/full-page-spinner";
import Banner from "./_components/banner";
import DetailedSearch from "./_components/detailed-search";
import { Suspense } from "react";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mt-32 w-full">
      <Banner />

      <Suspense fallback={<FullPageSpinner />}>
        <DetailedSearch>
          <div className="w-full max-w-[1119px]">{children}</div>
        </DetailedSearch>
      </Suspense>
    </main>
  );
}

export default layout;

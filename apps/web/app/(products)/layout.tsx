import Banner from "./_components/banner";
import TypeNav from "./_components/type-nav";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mt-32">
      <Banner />
      <TypeNav />
      {children}
    </main>
  );
}

export default layout;

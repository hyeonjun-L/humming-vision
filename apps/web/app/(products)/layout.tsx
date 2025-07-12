import Banner from "./_components/banner";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mt-32">
      <Banner />
      {children}
    </main>
  );
}

export default layout;

import AdminInitializer from "./_components/admin-initializer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminInitializer />
      {children}
    </>
  );
}

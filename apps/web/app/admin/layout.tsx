import ProtectWrapper from "./_components/ProtectWrapper";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectWrapper>{children}</ProtectWrapper>
    </>
  );
}

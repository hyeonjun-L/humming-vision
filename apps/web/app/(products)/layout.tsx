function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="mt-32">{children}</main>;
}

export default layout;

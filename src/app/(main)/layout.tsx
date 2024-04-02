import Header from "@/components/ui/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="container mt-5">{children}</div>
    </div>
  );
}

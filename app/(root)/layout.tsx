import Navbar from "../components/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-5">{children}</div>
    </main>
  );
}

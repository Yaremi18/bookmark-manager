import { NavbarWrapper } from "../components/navbar/wrapper";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex flex-col">
      <NavbarWrapper />
      <div className="flex-1 p-5">{children}</div>
    </main>
  );
}

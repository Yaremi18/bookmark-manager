import { NavbarWrapper } from "../components/navbar/wrapper";
import { SWRProvider } from "../swrProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex flex-col">
      <SWRProvider>
        <NavbarWrapper />
        <div className="flex-1 p-5">{children}</div>
      </SWRProvider>
    </main>
  );
}

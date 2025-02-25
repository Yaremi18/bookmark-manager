import { LeftArrowIcon } from "@/components/icons";
import Link from "next/link";
import { notFound } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    tag: string;
  }>;
};

const validTags = ["edit", "new"];

const Layout: React.FC<LayoutProps> = async ({ children, params }) => {
  const tag = (await params).tag;

  return (
    <>
      <div className="flex items-center gap-5">
        <Link href="/bookmarks" replace className="btn-link">
          <LeftArrowIcon />
        </Link>
        <h1 className="text-2xl my-4">
          {tag === "edit" ? "Edit your bookmark" : "Add a new bookmark"}
        </h1>
      </div>
      {validTags.includes(tag) ? children : notFound()}
    </>
  );
};

export default Layout;

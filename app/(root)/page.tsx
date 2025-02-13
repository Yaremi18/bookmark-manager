import { auth } from "@/auth";
import Link from "next/link";

const Home = async () => {
  const session = await auth();

  return (
    <div className="flex items-center justify-center h-full">
      <article className="text-center flex flex-col justify-center items-center">
        <h1 className="text-5xl">The place to save your bookmarks</h1>
        <div className="h-[1px] w-full bg-primary-100 my-5" />
        <span className="text-lg">A easy way to be organized</span>

        {session && (
          <Link className="my-5 btn-primary" href="/bookmarks">
            Start to create
          </Link>
        )}
      </article>
    </div>
  );
};

export default Home;

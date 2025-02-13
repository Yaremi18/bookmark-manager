import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "../icons";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo-dark.png" alt="Logo" width={186} height={42} />
        </Link>
        <div className="flex items-center gap-5">
          {session && session.user ? (
            <>
              <Link href="/bookmarks">
                <span>Bookmarks</span>
              </Link>
              <Link href="/favorities">
                <span>Favs</span>
              </Link>

              <Link href={`/user/${session.user?.id}`}>
                <span>{session.user?.name}</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({
                    redirectTo: "/",
                  });
                }}
              >
                <button type="submit" className="btn-outlined">
                  <span>Sign out</span>
                </button>
              </form>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit" className="btn-outlined">
                <GithubIcon />
                <span>Sign in with github</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

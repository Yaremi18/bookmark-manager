"use client";

import { handleSignIn, handleSignOut } from "@/app/actions/auth";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GithubIcon, MenuIcon } from "../icons";

type MenuProps = { session: Session | null };

const Navbar: React.FC<MenuProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menu =
    session && session.user ? (
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
          action={() => {
            setIsOpen(false);
            handleSignOut();
          }}
        >
          <button type="submit" className="btn-outlined">
            <span>Sign out</span>
          </button>
        </form>
      </>
    ) : (
      <form
        action={() => {
          setIsOpen(false);
          handleSignIn();
        }}
      >
        <button type="submit" className="btn-outlined">
          <GithubIcon />
          <span>Sign in with github</span>
        </button>
      </form>
    );

  return (
    <header className="px-5 py-3 bg">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo-dark.png"
            alt="Logo dark"
            width={186}
            height={42}
            className="hidden dark:block"
          />
          <Image
            src="/logo-light.png"
            alt="Logo light"
            width={186}
            height={42}
            className="block dark:hidden"
          />
        </Link>
        {/** Menu for big screens */}
        <div className="hidden sm:flex items-center gap-5 ">{menu}</div>

        {/** Menu for small screens */}
        <div className="sm:hidden relative">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen((prev) => !prev)}
            className="focus:outline-none"
            aria-expanded={isOpen}
          >
            <MenuIcon />
          </button>

          {/* Mobile Menu (Visible When `isOpen` is True) */}
          <div
            ref={dropdownRef}
            className={`
            p-4 flex flex-col gap-1
            absolute right-0 mt-2 w-max py-2 bg-black-200 rounded-lg shadow-lg
            transform origin-top-right transition-all duration-200 ease-in-out
            ${
              isOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }
            sm:hidden z-50
          `}
          >
            {menu}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

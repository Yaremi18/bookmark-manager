"use server";

import { signIn, signOut } from "@/auth";

export const handleSignOut = async () => {
  await signOut({
    redirectTo: "/",
  });
};

export const handleSignIn = async () => {
  await signIn("github");
};

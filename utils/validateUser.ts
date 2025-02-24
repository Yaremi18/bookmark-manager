import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const isUserAuthorized = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return null;
  }

  return session;
};

import prisma from "@/lib/prisma";
import { isUserAuthorized } from "@/utils/validateUser";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await isUserAuthorized();
  if (!session) {
    return NextResponse.json(null, { status: 401, statusText: "Unauthorized" });
  }

  const collections = await prisma.collection.findMany({});

  return NextResponse.json(collections);
};

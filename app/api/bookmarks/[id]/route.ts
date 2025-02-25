import prisma from "@/lib/prisma";
import { isUserAuthorized } from "@/utils/validateUser";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const session = await isUserAuthorized();
  if (!session) {
    return NextResponse.json(null, { status: 401, statusText: "Unauthorized" });
  }

  const { id } = await params;

  const bookmark = await prisma.bookmark.findUnique({
    where: {
      id: id,
      deletedAt: null,
    },
  });

  if (!bookmark) {
    return NextResponse.json(null, { status: 404, statusText: "Not found" });
  }

  return NextResponse.json(bookmark);
};

export const POST = async (req: NextRequest) => {
  const session = await isUserAuthorized();
  if (!session) {
    return NextResponse.json(null, { status: 401, statusText: "Unauthorized" });
  }

  const body = await req.json();

  if (!body) {
    return NextResponse.json(null, { status: 400, statusText: "Bad request" });
  }

  const bookmark = await prisma.bookmark.create({
    data: {
      title: body.title || undefined,
      url: body.url || undefined,
      description: body.description || undefined,
      collectionId: body.collectionId || undefined,
      tags: body.tags || undefined,
      updatedAt: new Date(),
    },
  });

  prisma.bookmarkByUser.create({
    data: {
      bookmarkId: bookmark.id,
      userId: session.user.id,
    },
  });

  return NextResponse.json(bookmark);
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const session = await isUserAuthorized();
  if (!session) {
    return NextResponse.json(null, { status: 401, statusText: "Unauthorized" });
  }

  const { id } = await params;

  const isShared =
    (await prisma.bookmarkByUser.count({
      where: {
        bookmarkId: id,
      },
    })) > 1;

  if (!isShared) {
    await prisma.bookmark.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  const bookmarkByUser = await prisma.bookmarkByUser.delete({
    where: {
      bookmarkId_userId: {
        bookmarkId: id,
        userId: session.user.id,
      },
    },
  });

  return NextResponse.json(bookmarkByUser);
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const session = await isUserAuthorized();
  if (!session) {
    return NextResponse.json(null, { status: 401, statusText: "Unauthorized" });
  }

  const { id } = await params;

  const body = await req.json();

  if (!body) {
    return NextResponse.json(null, { status: 400, statusText: "Bad request" });
  }

  const bookmark = await prisma.bookmark.update({
    where: {
      id,
    },
    data: {
      title: body.title || undefined,
      url: body.url || undefined,
      description: body.description || undefined,
      collectionId: body.collectionId || undefined,
      tags: body.tags || undefined,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(bookmark);
};

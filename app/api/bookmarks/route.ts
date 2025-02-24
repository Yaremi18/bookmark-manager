import { LIST_LIMIT } from "@/constants";
import prisma from "@/lib/prisma";
import { isUserAuthorized } from "@/utils/validateUser";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await isUserAuthorized();
  if (!session) {
    return NextResponse.json(null, { status: 401, statusText: "Unauthorized" });
  }

  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || LIST_LIMIT);
  const search = searchParams.get("search");
  const collectionId = searchParams.get("collectionId");
  const tags = searchParams.get("tags");
  const onlyFavorites = searchParams.get("onlyFavorites");

  const _tags = tags
    ?.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const query: Prisma.BookmarkFindManyArgs = {
    where: {
      users: {
        some: {
          user: {
            email: session.user.email,
          },
        },
      },
      deletedAt: null,
      isFavorite: onlyFavorites === "true" ? true : undefined,
      collectionId: collectionId ?? undefined,
      tags: _tags?.length ? { hasSome: _tags } : undefined,
      OR: search
        ? [
            {
              title: { contains: search, mode: "insensitive" },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ]
        : undefined,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      collection: {
        select: { name: true },
      },
    },
  };

  const transaction = await prisma.$transaction([
    prisma.bookmark.findMany(query),
    prisma.bookmark.count({ where: query.where }),
  ]);
  return NextResponse.json({
    data: transaction[0],
    total: transaction[1],
  });
};

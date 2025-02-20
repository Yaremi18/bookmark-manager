import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bookmarkByUserData: Prisma.BookmarkByUserCreateInput[] = [
  {
    bookmark: {
      create: {
        title: "Prisma docs",
        description: "Prisma helps",
        url: "https://www.prisma.io/docs/",
        tags: ["prisma", "database", "ORM"],
        collection: {
          create: {
            name: "Documentación",
          },
        },
      },
    },
    user: {
      create: {
        name: "John Doe",
        email: "john@test.com",
      },
    },
  },
  {
    bookmark: {
      create: {
        title: "Javascript docs",
        description: "Javascript helps",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        tags: ["javascript", "web", "frontend"],
        collection: {
          create: {
            name: "Programación",
          },
        },
      },
    },
    user: {
      connect: {
        email: "john@test.com",
      },
    },
  },
];

export async function main() {
  for (const u of bookmarkByUserData) {
    await prisma.bookmarkByUser.create({ data: u });
  }
}

main();

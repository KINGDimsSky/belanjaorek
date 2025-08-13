import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const intialPost: Prisma.PostsCreateInput[] = [
  {
    title: "About NextJS",
    content:
      "Next JS Is a Powerfull Fullstack Framework to Build Progressive web Apps",
    slug: "about-nextjs",
    Author: {
      connectOrCreate: {
        where: {
          email: "dimssky@gmail,com",
        },
        create: {
          email: "dimssky@gmail.com",
          username: "dimssky",
          password: "abogoboga",
        },
      },
    },
  },
];

export async function main() {
    console.log ("Start Seeding Database!...")
    for (const post of intialPost) {
        await prisma.posts.create({
            data: post
        })
        console.log (`Success Created post with ID ${post.id} !`)
    }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient } from "@prisma/client";
import { terms } from "../src/shared/data/terms";

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.term.deleteMany();

  await prisma.term.createMany({
    data: terms.map((term, index) => ({
      ...term,
      position: index
    }))
  });
};

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

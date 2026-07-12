import { prisma } from "@/lib/db";

export async function getProductsByIds (productIds: string[]) {
  if (productIds.length === 0) return [];

  const products = await prisma.product.findMany({
    where : {
      id : {
        in : productIds
      }
    },
    include : {
      category: true
    },
  })

  return products
}
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

export async function getSpesificProduct (slug : string) {
  return await prisma.product.findUnique ({
    where: {
      slug : slug,
    },
    include : {
      category: true,
      Seller: true,
      ProductImage: true
    }
  })
}
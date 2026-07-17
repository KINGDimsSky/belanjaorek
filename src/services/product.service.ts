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
      category : true,
      Seller: {
        select : {
          id : true,
          username : true,
          image : true
        }
      },
      ProductImage: true
    }
  })
}

export async function getFilteredProducts (
  category ?: string, sort ?: string,
  discount ?: string, filter ?: string) {
  return await prisma.product.findMany ({
    where : {
      ...(category && category !== 'All' && {
        category : {
          slug : category
        }
      }),
      ...(discount && discount === 'true' && {
        IsDiscount : true
      }),
    },
    orderBy : {
      ...(sort === 'newest' && {createdAt : 'desc'}),
      ...(filter && filter !== 'default' && {
        ...(filter === 'a-z' && {name : 'asc'}),
        ...(filter === 'z-a' && {name : 'desc'}),
        ...(filter === 'price-high' && {price : 'desc'}),
        ...(filter === 'price-low' && {price : 'asc'})
      })
    },
    include : {
      category : true
    },
    take : 10
  })
}

export async function countTotalProduct () {
  return await prisma.product.count();
}

export async function getAllCategory () {
  return await prisma.category.findMany();
}

export async function getProductsByCategory (category ?: string) {
  return await prisma.product.findMany({    
      where : {
        ...(category && category !== 'All' && {
          category : {
            slug : category
          }
        })
      },
      orderBy : {
        ...(category && category === 'All' && {
          createdAt : 'desc'
        })
      },

      include : {
        category : true
      },
      
      take : 10
    })
}

export async function getAllProductsByOwner (userId: string) {
  return await prisma.product.findMany({
    
  })
}
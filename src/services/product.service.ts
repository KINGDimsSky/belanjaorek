import { prisma } from "@/lib/db";
import { createProductDTO, editProductDTO } from "@/types/DTO/product-dto";
import { url } from "inspector";

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
      status : "PUBLISHED",
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
        status : "PUBLISHED",
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
      where : {
        userId : userId,
        status : {
          not : "ARCHIVED"
        }
      },
      include : {
        category : true,
        ProductDescription : {
          select : {
            id : true,
            description : true,
            LatestVersion : true,
          }
        },
        ProductImage : {
          select : {
            id : true,
            url : true
          }
        },
        productVerified : {
          select : {
            VerifiedProduct : true,
            LicensesAgreement : true
          }
        }
      }
  })
}

export async function getArchivedProductsByOwner (userId : string) {
  return await prisma.product.findMany({
    where : {
      userId : userId,
      status : "ARCHIVED",
    },
    include : {
      category : true,
      ProductDescription : true,
      ProductImage : true,
      productVerified : true
    }
  })
} 

export async function createSpesificProduct (product : createProductDTO) {
  return await prisma.product.create({
    data : {
      name : product.name,
      slug : product.slug,
      ProductDescription : {
        create : {
          description: product.description,
        ...(product.latestVersion && {
          LatestVersion : product.latestVersion
        })
        }
      },
      ProductImage : product.productImage && product.productImage.length > 0 ? {
        createMany : {
          data : product.productImage.map(url => ({
            url : url,
            name : "Product Image"
          }))
        }
      } : undefined,
      price : product.price,
      Stock : product.stock,
      categoryId: product.categoryId,
      userId: product.userId,
      ...(product.mainImage && {
        MainImage : product.mainImage,
      }),
      IsDiscount: product.isDiscount,
      DiscountPrice: product.discountPrice,      
    }
  })
}

export async function editSpesificProduct (payload : editProductDTO) {
  return prisma.product.update({
    where : {
      id : payload.id
    },
    data : {
      name : payload.name,
      slug : payload.slug,
      price : payload.price,
      Stock : payload.stock,
      IsDiscount : payload.isDiscount,
      DiscountPrice : payload.discountPrice,
      status : payload.status,
      categoryId : payload.categoryId,
      ProductDescription : {
        upsert : {
          create : {
            description : payload.description,
            ...(payload.latestVersion && {
              LatestVersion : payload.latestVersion
            })
          },
          update : {
            description : payload.description,
            ...(payload.latestVersion && {
              LatestVersion : payload.latestVersion
            })
          }
        }
      },
      ...(payload.mainImage && {
        MainImage : payload.mainImage
      }),
      ProductImage : {
        deleteMany : {},
        ...(payload.productImage && payload.productImage.length > 0 && {
          createMany : {
            data : payload.productImage.map((url) => ({
              url : url,
              name : "Product Image"
            }))
          }
        })
      }

    }
  })
}

export async function deleteProductsSpesificByOwner (productId : string) {
  return prisma.product.update({
    where : {
      id : productId
    },
    data : {
      status : 'ARCHIVED'
    }
  })
}
import { getAllProductsByOwner, getFilteredProducts, getSpesificProduct, getSpesificProductRating, getSpesificProductReviews } from "@/services/product.service";
import type { Prisma } from "@prisma/client";

export type CartPayload = {
  productId : string,
  quantity : number
}

export type CartItemDTO = {
  productId : string,
  quantity : number
}

export type UICartItems = {
  productId : string,
  name : string,
  price : number,
  image : string,
  quantity : number,
  slug : string
}

export type DetailedProductDTO = Prisma.PromiseReturnType<typeof getSpesificProduct>
export type ProductsByOwner = Prisma.PromiseReturnType<typeof getAllProductsByOwner>[number]
export type ProductWithCategory = Prisma.PromiseReturnType<typeof getFilteredProducts>[number]

export type ProductReviews = Prisma.PromiseReturnType<typeof getSpesificProductReviews>
export type ProductRatings = Prisma.PromiseReturnType<typeof getSpesificProductRating>


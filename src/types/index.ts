import type { Product, Category, User, ProductImage } from "@prisma/client";

export type ProductWithCategory = Product & {
  category: Category;
};

export type ProductWithUsersAndCategory = Product & {
  Seller : User;
  category: Category;
}

export interface CartItem extends Product { 
    quantity: number;
}

export type ProductWithUsersCategoryandImages = Product & {
  Seller : User;
  category: Category;
  ProductImage : ProductImage[];
}


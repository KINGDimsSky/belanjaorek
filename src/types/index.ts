import type { Product, Category, User } from "@prisma/client";

export type ProductWithCategory = Product & {
  category: Category;
};

export type ProductWithUsersAndCategory = Product & {
  Seller : User;
  category: Category;
}


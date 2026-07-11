import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";

export async function UserLoginValidate(email : string, password : string) {
  const IsExisting = await GetUserByEmail(email)

  if (!IsExisting) return null;

  if (!IsExisting.password) {
    return null;
  }

  const IsCompare = await bcrypt.compare(password, IsExisting.password);
  if (!IsCompare) return null;

  return IsExisting;
}

export async function createAnewUser(data : {
  email : string,
  password : string,
  username : string
}){
  await prisma.user.create({
    data: {
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
      username: data.username
    }
  })
}

export async function GetUserByEmail(email: string) {
  const IsFound = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!IsFound) return null;

  return IsFound
}

export async function createGoogleUser(data : {
  email : string,
  username?: string | null,
  image?: string | null,
}) {
  return await prisma.user.create({
    data: {
      email: data.email,
      username: data.username || data.email.split('@')[0],
      image: data.image,
    },
  });
}

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

export async function GetCartById (productsIds : string[]) {
    if (productsIds.length === 0) return [];

    //Nanti disini syggg
}

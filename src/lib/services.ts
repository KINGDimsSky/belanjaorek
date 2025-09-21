import { prisma } from "./db";
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

export async function GetUserByEmail(email: string) {
  const IsFound = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!IsFound) return null;

  return IsFound
}

export async function GoogleLogin(data : {
  email : string,
  username?: string | null,
  image?: string | null,
}) {
  const existingUser = await GetUserByEmail(data.email);

  if (existingUser) {
    console.log("Google user found in DB:", data.email);
    return existingUser;
  }

  console.log("Google user not found, creating new user:", data.email);
  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      username: data.username || data.email.split('@')[0],
      image: data.image,
    },
  });

  return newUser;
}



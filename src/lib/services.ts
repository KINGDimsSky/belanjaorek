import { prisma } from "./db";
import bcrypt from "bcryptjs";

export async function UserLoginValidate(email : string, password : string) {
  const IsExisting = await GetUserByEmail(email)

  if (!IsExisting) return null;

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

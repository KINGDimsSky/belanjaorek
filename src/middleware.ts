import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";
import { checkAuthentication } from "./middlewares/auth-checkers";

export default async function Middleware (request: NextRequest) {
   const { pathname } = request.nextUrl;

   const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
   })
   
   const authResponse = checkAuthentication(token, pathname, request.url);
    
   if (authResponse.status !== 200) {
    return authResponse;
   }

   // pengecekan Role Nanti Kita lakukan Di role-checkers.ts

    return authResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
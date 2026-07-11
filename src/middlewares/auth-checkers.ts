import { JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";

export function checkAuthentication(token: JWT | null, pathname: string) {
    const isDashboardRoute = pathname.startsWith('/dashboard');

    if (isDashboardRoute && !token) {
        return NextResponse.redirect(new URL('/login', process.env.NEXT_AUTH_URL));
    }

    return NextResponse.next();
}
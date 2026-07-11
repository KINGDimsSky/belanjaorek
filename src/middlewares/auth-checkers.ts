import { JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";

export function checkAuthentication(token: JWT | null, pathname: string, requestURL: string) {
    const isDashboardRoute = pathname.startsWith('/dashboard');

    if (isDashboardRoute && !token) {
        return NextResponse.redirect(new URL('/login', requestURL));
    }

    return NextResponse.next();
}
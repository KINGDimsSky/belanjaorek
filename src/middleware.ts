import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

export default async function Middleware (request: NextRequest) {

    //Nanti Akan digantikan Menjadi Validasi Token JWT Untuk Autentikasi User
    
    return NextResponse.next();
}
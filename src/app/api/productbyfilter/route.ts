import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const category = searchParams.get('category');

    if (category!= 'all') {
        const product = await prisma.product.findMany({
            where : {
                category : {
                    slug : category || 'All'
                }
            },
            take : 10
        })
        return NextResponse.json({message: 'Success', status:200, data: product}, {status: 200})
    }
    
    const GetAllProducts = await prisma.product.findMany({
        take : 10
    })
    return NextResponse.json({message: 'Success', status: 200, data: GetAllProducts}, {status: 200})
}
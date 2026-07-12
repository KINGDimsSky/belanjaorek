import { prisma } from "@/lib/db";
import { CartItem } from "@/types";

export async function createACartDB (user : string, items: CartItem[]) {
    return await prisma.$transaction(async (tx) => {
        const cart = await tx.cart.upsert({
            where : {
                userId : user
            },
            update : {},
            create : {
                userId : user
            }
        })

        await tx.cartItems.deleteMany({
            where : {
                CartId : cart.id
            }
        })

        if (items.length >= 0) {
            await tx.cartItems.createMany({
                data : items.map((item) => (
                    {CartId : cart.id, productId : item.id, Quantity: item.quantity}
                ))
            })
        }

        return cart;
    })
}

export async function GetCartById (productsIds : string[]) {
    if (productsIds.length === 0) return [];

    //Nanti disini syggg
}
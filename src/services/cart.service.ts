import { prisma } from "@/lib/db";
import { CartPayload } from "@/types";

export async function createACartDB (user : string, items: CartPayload[]) {
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

        if (items.length > 0) {
            await tx.cartItems.createMany({
                data : items.map((item) => (
                    {CartId : cart.id, productId : item.productId, Quantity: item.quantity}
                ))
            })
        }

        return cart;
    })
}

export async function getCartByIds (userId : string) {
    return await prisma.cart.findUnique({
        where : {
            userId : userId
        },
        select : {
            CartItems : {
                select : {
                    productId : true,
                    Quantity : true,
                    Product : {
                        select : {
                            id : true,
                            name : true,
                            price : true,
                            image : true
                        }
                    }
                }
            },

        }
    })
}

//process
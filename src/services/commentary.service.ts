import { prisma } from "@/lib/db";
import { commentaryDTO } from "@/types/DTO/commentary-dto";

export async function createCommentaryByUser (payload : commentaryDTO) {
    await prisma.productCommentary.create({
        data : {
            userId : payload.userId,
            productId : payload.productId,
            subject : payload.subject,
            commentary : payload.commentary
        }
    })
}
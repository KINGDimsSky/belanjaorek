'use server'

import { commentarySchema } from "@/lib/schema/commentary-schema";
import { createCommentaryByUser } from "@/services/commentary.service";
import { getAuthSession } from "@/services/user.service";
import { redirect } from "next/navigation";
import z, { safeParse } from "zod";

export async function createCommentaryByUserAction (payload : z.infer<typeof commentarySchema>) {
    const IsValidate = commentarySchema.safeParse(payload);
    const user = await getAuthSession();

    if (!IsValidate.success) {
        return {message : "Wrong Field!", data : null, status: false}
    }

    if (!user) {
     redirect('/login')
    }

    const {id} = user

    const CommentaryPayload = {
        ...IsValidate.data,
        userId : id,
    }

    try {
        await createCommentaryByUser(CommentaryPayload)

        return {message: "Successfully Created A Commentary", data : CommentaryPayload, status: true}
    }catch (err) {
        return {message: "Oops Something went Wrong!", data : null, status : false}
    }
}
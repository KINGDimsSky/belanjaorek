import z from "zod";

export const commentarySchema = z.object({
    productId :  z.string({error: "Must be A String"}).min(5, {error : "At least Have 5 Character"}).max(30, {error: "Max Character is 30!"}),
    subject : z.string({error: "Must be A String"}).min(3, {error : "At least Have 3 Character"}).max(20, {error: "Max Character is 30!"}),
    commentary : z.string({error: "Must be A String"}).min(5, {error : "At least Have 5 Character"}).max(80, {error: "Max Character is 80!"}),
})
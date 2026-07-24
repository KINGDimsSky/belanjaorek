import { createCommentaryByUserAction } from "@/actions/commentary.action";
import { commentarySchema } from "@/lib/schema/commentary-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

export function useCreateCommentaryByUser () {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : async (payload : z.infer<typeof commentarySchema>) => {
            const result = await createCommentaryByUserAction(payload);

            if (!result.status) throw new Error('Oops Something went wrong!');

            return result.data
        },
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ['product-review']})
            toast.success('Successfully Commented On this Products');
        },
        onError : () => {
            toast.error('Oops Something went wrong!');
        }
    })
}
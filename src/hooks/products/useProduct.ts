import { createSpesificProductAction } from "@/actions/product.action";
import { productCreateSchema } from "@/lib/schema/product-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

export function useCreateProductMutation () {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : async (payload : z.infer<typeof productCreateSchema>) => {
            const result = await createSpesificProductAction(payload);

            if (result?.status === false) throw new Error ('oops something went Wrong!');

            return result?.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ['products']})
            toast.success('Successfully Created Product!');
        },
        onError: (error : Error) => {
            toast.error(error.message || 'Failed To create A Product!')
        }
    })
}


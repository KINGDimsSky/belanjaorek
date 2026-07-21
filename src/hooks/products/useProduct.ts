import { createSpesificProductAction, getProductsByCategoryActions, getProductsByOwnerActions } from "@/actions/product.action";
import { productCreateSchema } from "@/lib/schema/product-schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export function useGetProductsByCategory (category : string) {
    return useQuery({
        queryKey : ['products', category],
        queryFn: async () => {
            const result = await getProductsByCategoryActions(category);

            if (!result.status) throw new Error ('Oops Something went Wrong!');

            return result.data;
        }
    })
}

export function useGetProductsByOwner() {
    return useQuery({
        queryKey : ['products'],
        queryFn : async () => {
            const result = await getProductsByOwnerActions()

            if (!result.status) throw new Error('Oops Something went wrong!')

            return result.data
        }
    })
}
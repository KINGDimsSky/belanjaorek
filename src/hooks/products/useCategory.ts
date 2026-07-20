import { getAllCategoryActions } from "@/actions/product.action";
import { useQuery } from "@tanstack/react-query";

export function useFetchCategory () {
    return useQuery({
        queryKey: ['categories'],
        queryFn : async () => {
            const result = await getAllCategoryActions();
            if (!result.status) throw new Error ('cant get Category in Actions');
            return result.data
        },
    })
}


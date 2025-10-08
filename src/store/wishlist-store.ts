import { ProductWithCategory } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface WishlistType {
    WishlistItem: ProductWithCategory[];
    ToggleWishlist: (product: ProductWithCategory) => void;
    RemoveFromWishlist: (productId: string) => void;
    ClearWishlist : () => void;
}   

export const UseWishListStore = create(persist<WishlistType>((set) => ({
    WishlistItem: [],

    ToggleWishlist: (product) => set((state) => {
        const ExistingItem = state.WishlistItem.find((item) => item.id === product.id);

        if (ExistingItem) {
            const UpdatedItem = state.WishlistItem.filter((item) => item.id !== product.id)
            toast.success('Product Removed From Wishlist!');
            return {WishlistItem : UpdatedItem};
        }else {
            toast.success('Product Added To Wishlist!');
            return {WishlistItem : [...state.WishlistItem, {...product}]};
        }
    }),

    RemoveFromWishlist: (ProductID) => set((state) => {
        const UpdatedItem = state.WishlistItem.filter((item) => item.id !== ProductID);
        toast.success('Product Removed from Wishlist!');
        return {WishlistItem: UpdatedItem};
    }),

    ClearWishlist: () => set({
        WishlistItem : []
    })
}), 
    { name : 'WishlistItem', }
))
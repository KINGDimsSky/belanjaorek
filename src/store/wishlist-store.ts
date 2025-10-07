import { create } from "zustand";


interface WishlistType {
    WishlistItem: any[];
    AddToWishlist: (product: any) => void;
}


export const  UseWishlistStore = create<WishlistType>((set) => ({ //On Going Progress
    WishlistItem: [],

    AddToWishlist : (product: any) => set((state: any) => {

        return {} 
    })  
}))
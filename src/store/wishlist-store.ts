import { create } from "zustand";

interface WishlistType {
    WhislistProductIds : Set<string>;
    setInitialWhislist : (productIds: string[]) => void;
    toggleWhislist : (productId: string) => void;
}   

export const UseWhislistStore = create<WishlistType>((set) => ({
    WhislistProductIds : new Set(),

    setInitialWhislist : (productIds) => set({
        WhislistProductIds: new Set(productIds)
    }),

    toggleWhislist : (productId) => set((state) => {
        const newWhislist = new Set(state.WhislistProductIds);

        if (newWhislist.has(productId)) {
            newWhislist.delete(productId);
        }else {
            newWhislist.add(productId);
        }
        return {WhislistProductIds : newWhislist};
    })
}))
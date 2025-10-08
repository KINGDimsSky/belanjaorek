import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@prisma/client';
import { toast } from 'sonner';
import { CartItem } from '@/types';


interface CartState {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}   

export const UsecartStore = create(persist<CartState>((set) => ({ //On Going To Be Finished
    cartItems: [], 

    addToCart: (product) => set((state) => {
        const ExistingItem = state.cartItems.find((item) => item.id === product.id);

        if (ExistingItem) {
          const UpdatedItem = state.cartItems.map((item) => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
          toast.success('Product Added to Cart!');
          return {cartItems: UpdatedItem};
        }else {
            toast.success('Product Added to Cart!');
            return {cartItems : [...state.cartItems, {...product, quantity: 1}]};
        }
    }),
    removeFromCart: (productID) => set((state) => {
        const UpdatedItem = state.cartItems.filter((item) => item.id !== productID)
        toast.success('Product Removed from Cart!');
        return {cartItems: UpdatedItem}
    }),

    clearCart: () => set({cartItems : []})
}),
    { name: 'cartItems' }
))







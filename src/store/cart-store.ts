import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@prisma/client';
import { toast } from 'sonner';
import { CartItem } from '@/types';


interface CartState {
    cartItems: CartItem[];
    amount: number;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}   

export const UsecartStore = create(persist<CartState>((set) => ({ 
    cartItems: [], 
    amount: 1,

    addToCart: (product) => set((state) => {
        const ExistingItem = state.cartItems.find((item) => item.id === product.id);

        if (ExistingItem) {
          const UpdatedItem = state.cartItems.map((item) => item.id === product.id ? {...item, quantity: item.quantity + state.amount} : item)
          toast.success('Product Added to Cart!');
          return {cartItems: UpdatedItem};
        }else {
            toast.success('Product Added to Cart!');
            return {cartItems : [...state.cartItems, {...product, quantity: state.amount}]};
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







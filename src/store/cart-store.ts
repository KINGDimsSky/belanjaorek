import { create } from 'zustand';
import { Product } from '@prisma/client';
import { toast } from 'sonner';

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}   

export const UsecartStore = create<CartState>((set) => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems') ?? '[]') || [],

    addToCart: (product) => set((state) => {
        const ExistingItem = state.cartItems.find((item) => item.id === product.id);

        if (ExistingItem) {
          const UpdatedItem = state.cartItems.map((item) => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
          localStorage.setItem('cartItems', JSON.stringify(UpdatedItem));
          toast.success('Product Added to Cart!');
          return {cartItems: UpdatedItem};
        }else {
            return {cartItems : [...state.cartItems, {...product, quantity: 1}]};
        }
    }),
    removeFromCart: (productID) => set((state) => {
        const UpdatedItem = state.cartItems.filter((item) => item.id !== productID)

        return {cartItems: UpdatedItem}
    }),

    clearCart: () => set({cartItems : []})
}))






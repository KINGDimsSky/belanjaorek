import { create } from 'zustand';
import { Product } from '@prisma/client';

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}   



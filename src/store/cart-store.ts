import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { DetailedProductDTO, UICartItems } from '@/types';

interface CartState {
    cartItems: UICartItems[];
    amount: number;
    addToCart: (product: NonNullable<DetailedProductDTO>) => void;
    setInitialCart : (items : UICartItems[]) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}   

export const UsecartStore = create(persist<CartState>((set) => ({ 
    cartItems: [], 
    amount: 1,

    setInitialCart : (items) => set((state) => {
        return {cartItems : items};
    }),

    addToCart: (product) => set((state) => {
        const ExistingItem = state.cartItems.find((item) => item.productId === product.id);

        if (ExistingItem) {
          const UpdatedItem = state.cartItems.map((item) => item.productId === product.id ? {...item, quantity: item.quantity + state.amount} : item)
          toast.success('Product Added to Cart!');
          console.log (UpdatedItem);
          return {cartItems: UpdatedItem};
        }else {
            toast.success('Product Added to Cart!');
            const newItem : UICartItems = {
                productId : product.id,
                name : product.name,
                price : product.price,
                image : product.image || '/NoProduct.jpg',
                quantity : state.amount
            }
            console.log (newItem);
            return {cartItems : [...state.cartItems, newItem]};
        }
    }),
    removeFromCart: (productID) => set((state) => {
        const UpdatedItem = state.cartItems.filter((item) => item.productId !== productID)
        toast.success('Product Removed from Cart!');
        return {cartItems: UpdatedItem}
    }),

    clearCart: () => set({cartItems : []})
}),
    { name: 'cartItems' }
))







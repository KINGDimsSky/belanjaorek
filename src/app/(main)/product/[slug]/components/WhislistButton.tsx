// src/components/products/WishlistButton.tsx
'use client';

import { UseWhislistStore } from '@/store/wishlist-store';
import { toggleWishlistAction } from '@/lib/actions';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { useTransition } from 'react';
import { toast } from 'sonner';

export function WishlistButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const wishlistProductIds = UseWhislistStore((state) => state.WhislistProductIds);
  const toggleWishlistClient = UseWhislistStore((state) => state.toggleWhislist);
  
  const isWishlisted = wishlistProductIds.has(productId);

  const handleToggle = () => {
    // 1. Langsung ubah UI secara optimis
    toggleWishlistClient(productId);

    // 2. Jalankan aksi server di belakang layar
    startTransition(async () => {
      const result = await toggleWishlistAction(productId);
      if (result?.error) {
        // Jika server gagal, kembalikan UI ke keadaan semula (rollback)
        toggleWishlistClient(productId); 
        toast.error(result.error);
      }
    });
  };

  return (
    <button onClick={handleToggle} disabled={isPending}>
      {isWishlisted ? <FaHeart className="text-red-500" /> : <CiHeart />}
    </button>
  );
}
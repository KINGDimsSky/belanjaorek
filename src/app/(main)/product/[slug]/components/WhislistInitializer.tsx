// src/components/wishlist-initializer.tsx
'use client';

import { UseWhislistStore } from '@/store/wishlist-store';
import { useEffect, useRef } from 'react';

// Komponen ini tidak me-render apa-apa, tugasnya hanya inisialisasi
export default function WishlistInitializer({ initialWishlistIds }: { initialWishlistIds: string[] }) {
  const initialized = useRef(false);
  
  // Panggil setInitialWishlist hanya sekali saat komponen pertama kali mount
  useEffect(() => {
    if (!initialized.current) {
      UseWhislistStore.getState().setInitialWhislist(initialWishlistIds);
      initialized.current = true;
    }
  }, [initialWishlistIds]);

  return null;
}
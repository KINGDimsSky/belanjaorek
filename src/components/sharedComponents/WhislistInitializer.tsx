'use client';

import { UseWhislistStore } from '@/store/wishlist-store';
import { useEffect, useRef } from 'react';

export default function UseWishlistInitializer({ initialWishlistIds }: { initialWishlistIds: string[] }) {
  const initialized = useRef(false);
  
  useEffect(() => {
    if (!initialized.current) {
      UseWhislistStore.getState().setInitialWhislist(initialWishlistIds);
      initialized.current = true;
    }
  }, [initialWishlistIds]);

  return null;
}
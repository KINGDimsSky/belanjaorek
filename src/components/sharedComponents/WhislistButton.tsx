'use client';

import { UseWhislistStore } from '@/store/wishlist-store';
import { toggleWishlistAction } from '@/lib/actions';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { Fragment, useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function WhislistButton({ productId, Isabsolute }: { productId: string , Isabsolute : boolean}) {
  const [isPending, startTransition] = useTransition();
  const wishlistProductIds = UseWhislistStore((state) => state.WhislistProductIds);
  const toggleWishlistClient = UseWhislistStore((state) => state.toggleWhislist);
  const isWishlisted = wishlistProductIds.has(productId);
  const router = useRouter();
  const {data: session, status} = useSession();

  const handleToggle = () => {
    if (status === 'unauthenticated') {
      return router.push('/login');
    }

    toggleWishlistClient(productId);

    startTransition(async () => {
      const result = await toggleWishlistAction(productId);
      if (result.status === false) {
       toggleWishlistClient(productId); 
       toast.error(result.message);
      }else {
        toast.success(result.message)
      }
    });
  };

  return (
    <Fragment>
      {Isabsolute ? (
        <div onClick={handleToggle} className={cn("absolute top-2 right-3 p-1 rounded-full cursor-pointer", isWishlisted ? "bg-red-500" : "bg-black/50")}>
          {isWishlisted ? <FaHeart className="text-white w-6 h-6"/> : <CiHeart className='w-6 h-6'/>}
        </div>
    ) : (
      <Button variant={'ghost'} onClick={handleToggle} disabled={isPending} className={cn('border border-foreground/50', isWishlisted ? "bg-pink-500" : "")}>
        {isWishlisted ? <FaHeart className="text-white"/> : <CiHeart />}
      </Button>
    )}
    </Fragment>
  );
}
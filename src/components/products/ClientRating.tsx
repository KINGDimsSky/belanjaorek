import { ProductRatings, ProductReviews } from "@/types";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface clientRatingProps {
  reviews: ProductReviews;
  stars: ProductRatings;
}

export default function ClientRating({ reviews, stars }: clientRatingProps) {  
  return (
    <div className="flex flex-col">
      {reviews.map((review) => {
        const userRating = stars.find((s) => s.userId === review.userId)?.stars || 5;

        return (
        <div key={review.id} className="flex flex-col">
          <div className="flex gap-2 items-center mb-2">
            <div className="relative rounded-full w-6 h-6">
              <Image className="object-cover" src={review.user.image || "/NoUsers.jpg"} alt={review.user.username || 'Users'} width={100} height={100}/>
            </div>
            <p className="text-sm tracking-tight">{review.user.username}</p>
            <p className="text-sm ml-4 tracking-tighter text-foreground/35">
              {new Date(review.createdAt).toLocaleDateString('id-ID', {
                day : 'numeric',
                month : 'short',
                year : 'numeric'
              })}
            </p>
          </div>
          <div className="flex gap-4 items-center mb-4">
            <div className="flex text-xs text-primary">
              {Array.from({ length: userRating }).map((_, i) => (
                <FaStar key={i}/>
              ))}
            </div>
            <p className="font-medium tracking-tight text-sm">
              {review.subject}
            </p>
          </div>
          <p className="text-xs tracking-tight w-[28rem]">
            {review.commentary}
          </p>
        </div>
      );
    })}
    </div>
  );
}

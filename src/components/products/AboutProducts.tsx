'use client'

import ClientRating from "@/components/products/ClientRating";
import { Select, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";  
import { cn } from "@/lib/utils";
import { DetailedProductDTO,  } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import SafeHTML from "../sharedComponents/safeHTML";
import { useGetSpesificProductRating, useGetSpesificProductReviews } from "@/hooks/products/useProduct";
import { Skeleton } from "../ui/skeleton";
import AddCommentary from "../sharedComponents/AddCommentary";

export default function AboutProductComponent({products} : {products : NonNullable<DetailedProductDTO>}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [clicked, SetClicked] = useState<boolean>(false);
  const {data: reviews, isLoading : loadingReview} = useGetSpesificProductReviews(products.id);
  const {data : ratings, isLoading : loadingRating} = useGetSpesificProductRating(products.id);
  const reviewCount = reviews?.length;
  const ratingCount = ratings?.length;
  const items = products.ProductImage;
  
  
  const nextSlide = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  return (
    <div className="flex flex-col mt-4 mb-16">
      <p className=" text-center text-xs mb-4 rounded-md py-2">1/{items.length}</p>     
      <div className="relative overflow-hidden">
        {items.length === 0 && (
          <div className="">
            No Images
          </div>
        )} 
        <div className="flex gap-4 transition-transform duration-500 ease-in-out" style={{transform: `translateX(-${currentIndex * 25}%)`,}}>
          {items.map((item, idx) => (
            <div onClick={() => SetClicked(!clicked)} className="relative w-20 h-20 bg-slate-400" key={idx}>
              <Image src={item.url} key={item.id} alt={item.name} width={200} height={200}/>
            </div>
          ))}
        </div>
        {currentIndex >= 1 ? (
          <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-foreground text-background border border-background hover:bg-background hover:text-foreground p-1">
            <GrFormPrevious className="w-8 h-8"/>
          </button>
        ) : (
          null
        )} 
        {currentIndex == items.length - 5 ? (
          null
        ) : (
          <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground text-background border border-background hover:bg-background hover:text-foreground p-1">
             <MdNavigateNext className="w-8 h-8"/>
           </button>
           )}
      </div>
      <div className="border-t border-foreground/15 mt-4 w-full"></div>
      <div className="mt-3 text-sm">
        <SafeHTML content={products.ProductDescription?.description || 'No Description!'} className=""/>
      </div>
      <h2 className="font-bold mb-4 mt-8 text-2xl">Reviews</h2>
      <div className="flex flex-col">
        <div className="flex gap-6 items-center">
          <div className="flex gap-1 items-center text-primary">
            {Array.from({length: 5}).map((_, i) => (
              <FaStar key={i}/>
            ))}
          </div>
          <p className="text-sm font-semibold">With 5 Stars</p>
        </div>
        <p className="text-xs tracking-tight font-extralight mt-2">This Assets Has {ratingCount} User ratings and {reviewCount} User Reviews</p>
        <p className="mt-6 mb-2 font-semibold">Sort By</p>
        <div className="flex w-64 gap-4 mb-8">
          <Select>
            <SelectTrigger className={cn('flex gap-2 rounded-none text-base px-2 py-1')}>
              <SelectValue placeholder={"Most Recent"}/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="mostrecent">Most Recent</SelectItem>
                <SelectItem value="older">Older</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className={cn('flex gap-2 rounded-none text-base px-2 py-1')}>
              <SelectValue placeholder={"All Stars"}/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="allstars">All Stars</SelectItem>
                <SelectItem value="5 Stars">5 Star</SelectItem>
                <SelectItem value="4 Stars">4 Star</SelectItem>
                <SelectItem value="3 Stars">3 Star</SelectItem>
                <SelectItem value="2 Stars">2 Star</SelectItem>
                <SelectItem value="1 Stars">1 Star</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {loadingReview || loadingRating ? (
          <Skeleton className="w-full h-32"/>
        ) : !reviews || !ratings || (reviews?.length === 0 && ratings?.length === 0) ? (
          <h2 className="text-sm tracking-tight">This Products Has No Commentary Or Ratings</h2>
        ) : (
          <ClientRating stars={ratings} reviews={reviews}/>
        )}
        <AddCommentary productsId={products.id}/>
      </div>
    </div>
  );
}

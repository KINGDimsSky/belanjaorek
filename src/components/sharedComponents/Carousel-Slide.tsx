"use client"

import { useState } from "react"
import CategoryCard from "../products/CategoryCard"
import { MdNavigateNext } from "react-icons/md"
import { GrFormPrevious } from "react-icons/gr";

export default function CarouselSlide() {
  const items = [1, 2, 3, 4, 5, 6,];
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="relative w-full overflow-hidden">
      <div className="flex gap-4 transition-transform duration-500 ease-in-out"
        style={{transform: `translateX(-${currentIndex * 25}%)`,}}>
        {items.map((item, idx) => (
           <div key={idx} className="">
             <CategoryCard/>
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
      {currentIndex == items.length - 4 ? (
        null
      ) : (
        <button
        onClick={nextSlide} 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground text-background border border-background hover:bg-background hover:text-foreground p-1">
        <MdNavigateNext className="w-8 h-8"/>
      </button>
      )}
    </div>
  )
}

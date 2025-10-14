'use client'

import ClientRating from "@/app/(main)/product/[slug]/components/ClientRating";
import { Select, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";  
import { cn } from "@/lib/utils";
import { FaStar } from "react-icons/fa";

export default function AboutProductComponent() {
  return (
    <div className="flex flex-col mt-4 mb-16">
      <p className="w-full text-center text-xs mb-4 rounded-md py-2 bg-gray-400/15">1/15</p>
      <div className="relative flex gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="relative w-20 h-20 bg-yellow-200" key={index}>
            <h2>Image</h2>
          </div>
        ))}
        <div className="absolute text-2xl right-0 top-5 py-1 px-2 cursor-pointer bg-black">
          <h2>{">"}</h2>
        </div>
        <div className="absolute text-2xl left-0 top-5 py-1 px-2 cursor-pointer bg-black">
          <h2>{"<"}</h2>
        </div>
      </div>
      <div className="border-t border-foreground/15 mt-4 w-full"></div>
      <div className="mt-3 text-sm">
        <h2 className="w-96 tracking-tight">SummerHouse Hustler Is A Family and Gang Modpack Where is Grove Street Homies Are in
          Support To Grand Theft Auto San Andreas, Native Offline or SAMP
        </h2>
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
        <p className="text-xs tracking-tight font-extralight mt-2">This Assets Has 772 User ratings and 292 User Reviews</p>
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
        <ClientRating/> {/* Nanti Ini Di kasih Props */}
      </div>
    </div>
  );
}

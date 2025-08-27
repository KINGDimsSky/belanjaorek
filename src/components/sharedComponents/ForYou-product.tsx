import Link from "next/link";
import ProductCard from "../products/product-card";


export default async function ForYouProduct() {

  return (
    <div className="flex flex-col w-full mb-12">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <h2 className="py-1 px-2 bg-foreground text-background font-medium tracking-tight text-xs border border-foreground">New Arrivals</h2> {/* Iki NGKO Data Category */}
          <h2 className="py-1 px-2 bg-background text-foreground border border-foreground tracking-tight text-xs font-medium">Unity Assets</h2>
          <h2 className="py-1 px-2 bg-background text-foreground border border-foreground tracking-tight text-xs font-medium">SAMP</h2>
          <h2 className="py-1 px-2 bg-background text-foreground border border-foreground tracking-tight text-xs font-medium">Icons</h2>
        </div>
        <div className="">
          <Link href={'/products'} className="uppercase underline font-semibold cursor-pointer">View all</Link>
        </div>
      </div>
      <div className="mt-12">
        <ProductCard/>
      </div>
    </div>
  );
}

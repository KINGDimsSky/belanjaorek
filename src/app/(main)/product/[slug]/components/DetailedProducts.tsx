import Image from "next/image";
import BreadCrumb from "./BreadCrump";
import AboutProductComponent from "@/app/(main)/product/[slug]/components/AboutProducts";
import DescProduct from "./DescProduct";
import { prisma } from "@/lib/db";
import { getWishlistIdsAction } from "@/lib/actions";

export default async function DetailedProductComponent({slug} : {slug : string}) {
  const InitialWhislistIds = await getWishlistIdsAction();
  
  const product = await prisma.product.findUnique({
        where : {
            slug : slug 
        },
        include : {
          category : true,
          Seller: true
        },
    })

    if (!product) {
      return (
      <div className="flex items-center justify-center min-h-screen">
        <h2>Oops, No Product Founds!</h2>
      </div>
      )
    }

  return (
    <div className="flex flex-col mt-6">
      <BreadCrumb prodName={product.name} Category={product.category}/>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col">
          <div className="relative w-[35rem] h-[25rem] bg-yellow-200">
            <Image className="object-cover" 
              src={product?.image || '/NoProduct.jpg'}
              alt={product.name} fill/>
          </div>
          <AboutProductComponent/>
        </div>
        <DescProduct products={product}/>
      </div>
    </div>
  );
}

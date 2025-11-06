import Image from "next/image";
import BreadCrumb from "./BreadCrump";
import AboutProductComponent from "@/app/(main)/product/[slug]/components/AboutProducts";
import DescProduct from "./DescProduct"
import {ProductWithUsersCategoryandImages } from "@/types";

export default function DetailedProductComponent({product} : {product : ProductWithUsersCategoryandImages}) {
  return (
    <div className="flex flex-col mt-6">
      <BreadCrumb prodName={product.name} Category={product.category}/>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col">
          <div className="relative w-[35rem] h-[25rem]">
            <Image className="object-cover" 
            src={product?.image || '/NoProduct.jpg'}
            alt={product.name} fill/>
          </div>
          <AboutProductComponent products={product}/>
        </div>
        <DescProduct products={product}/>
      </div>
    </div>
  );
}

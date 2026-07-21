import Image from "next/image";
import BreadCrumb from "./BreadCrump";
import AboutProductComponent from "@/components/products/AboutProducts";
import DescProduct from "./DescProduct"
import {DetailedProductDTO } from "@/types";

export default function DetailedProductComponent({product} : {product : NonNullable<DetailedProductDTO>}) {

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { 
      label: product.category.title, 
      href: `/products?category=${product.category.slug}` 
    },
    { 
      label: product.name,
      href: `/product/${product.slug}`
    }
  ];

  return (
    <div className="flex flex-col mt-6">
      <BreadCrumb items={breadcrumbItems} textSize="text-xs"/>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col">
          <div className="relative w-[35rem] h-[25rem]">
            <Image className="object-cover" 
            src={product?.MainImage || '/NoProduct.jpg'}
            alt={product.name} fill/>
          </div>
          <AboutProductComponent products={product}/>
        </div>
        <DescProduct products={product}/>
      </div>
    </div>
  );
}

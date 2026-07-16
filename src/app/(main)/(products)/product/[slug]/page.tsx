import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DetailedProductComponent from "@/components/products/DetailedProducts";
import { getSpesificProduct } from "@/services/product.service";
import { notFound } from "next/navigation";

interface DetailedProductsPageProps {
    params: {
        slug: string;
    }
}

export default async function DetailedProductsPage ({params}: DetailedProductsPageProps) {
    const { slug } = params;
    
    if (!slug) notFound();

    const product = await getSpesificProduct(slug);
    

    if (!product) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <h2>Oops, No Product Founds!</h2>
        </div>
      )
    }

    return (
        <div className="flex flex-col min-h-screen">
          <MaxWidthWrapper className="flex flex-col ">
            <DetailedProductComponent product={product}/>
          </MaxWidthWrapper>
        </div>
    )
}
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DetailedProductComponent from "@/app/(main)/product/[slug]/components/DetailedProducts";
import { FaCheck, FaTruckMoving } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { prisma } from "@/lib/db";

interface DetailedProductsPageProps {
    params: {
        slug: string;
    }
}

export default async function DetailedProductsPage ({params}: DetailedProductsPageProps) {
    const { slug } = params;
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
        <div className="flex flex-col min-h-screen">
          <div className="border-b border-foreground/15 border-t border-t-foreground/5 py-3">
            <MaxWidthWrapper className="flex gap-16 justify-center">
              <div className="flex hover:underline cursor-pointer items-center gap-2">
                <FaTruckMoving />
                <h2 className="font-medium tracking-tight uppercase text-sm"> Free Delivery On Orders Above RP 900k </h2>
              </div>
              <div className="flex hover:underline cursor-pointer items-center gap-2">
                <IoMdMail />
                <h2 className="font-medium tracking-tight uppercase text-sm"> CHAT WITH US </h2>
              </div>
              <div className="flex hover:underline cursor-pointer items-center gap-2">
                <FaCheck />
                <h2 className="font-medium tracking-tight uppercase text-sm"> Contact Us </h2>
              </div>
            </MaxWidthWrapper>
          </div>
          <MaxWidthWrapper className="flex flex-col ">
              <DetailedProductComponent product={product}/>
          </MaxWidthWrapper>
        </div>
    )
}
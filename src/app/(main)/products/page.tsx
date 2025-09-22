import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AllProducts from "@/components/sharedComponents/all-products";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { prisma } from "@/lib/db";
import { SlashIcon } from "lucide-react";
import { FaCheck, FaTruckMoving } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoReturnUpBackSharp } from "react-icons/io5";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    sort?: string;
    // filter lain cak otw misal: discount?: 'true'
  }
}

export default async function ProductsPage({searchParams} : ProductsPageProps) {
  const { category, sort } = searchParams;
  const productsLength = await prisma.product.count();

  const products = await prisma.product.findMany({
    where: {
      ...(category && category !== 'all' && {
        category: { slug: category },
      }),
    },
    orderBy: {
       ...(sort === 'newest' && { createdAt: 'desc' }),
    },
    include: {
        category: true 
    },
    take: 12,
  });
  
  const categories = await prisma.category.findMany();

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
      <MaxWidthWrapper className="mt-4">
        <Breadcrumb>
          <BreadcrumbList className="text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink
                className="underline flex items-center hover:bg-foreground hover:text-background gap-2"
                href="/">
                <IoReturnUpBackSharp />
                <p>Home</p>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-default">
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-6">
          <div className="flex gap-4 items-end">
            <h2 className="font-medium uppercase italic tracking-widest text-3xl">
              Products
            </h2>
            <p className="font-light uppercase tracking-tight text-xs">
              [{productsLength}]
            </p>
          </div>
          <AllProducts products={products} categories={categories} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

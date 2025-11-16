import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BreadCrumb from "@/components/products/BreadCrump";
import AllProducts from "@/components/sharedComponents/all-products";
import { prisma } from "@/lib/db";
import { IoReturnUpBackSharp } from "react-icons/io5";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    sort?: string;
    discount?: string;
    filter?: string;
    // filter lain cak otw misal: sex?: 'true'
  }
}

export default async function ProductsPage({searchParams} : ProductsPageProps) {
  const { category, sort, discount, filter } = searchParams;
  const productsLength = await prisma.product.count();

  const products = await prisma.product.findMany({
    where: {
      ...(category && category !== 'all' && {
        category: { slug: category },
      }),

      ...(discount && discount !== "false" && {
        IsDiscount: true,
      })
    },
    orderBy: {
       ...(sort === 'newest' && { createdAt: 'desc' }),
       ...(filter && filter !== 'default' && {
        
       })
    },
    include: {
        category: true 
    },
    take: 12,
  });
  
  const categories = await prisma.category.findMany();

  const BreadCrumbItems = [
    {
      label: (
        <span className="underline flex items-center hover:bg-foreground hover:text-background gap-2">
          <IoReturnUpBackSharp />
          <p>Home</p>
        </span>
      ),
      href: "/",
    },
    {
      label: "Products",
      href: "/products",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <MaxWidthWrapper className="mt-4">
        <BreadCrumb items={BreadCrumbItems} textSize="text-sm"/>
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

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BreadCrumb from "@/components/products/BreadCrump";
import AllProducts from "@/components/sharedComponents/all-products";
import { countTotalProduct, getAllCategory, getFilteredProducts } from "@/services/product.service";
import { IoReturnUpBackSharp } from "react-icons/io5";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    sort?: string;
    discount?: string;
    filter?: string;
  }
}

export default async function ProductsPage({searchParams} : ProductsPageProps) {
  const { category, sort, discount, filter } = searchParams;
  const productsLength = await countTotalProduct();
  const products = await getFilteredProducts(category, sort, discount, filter);
  const categories = await getAllCategory();

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

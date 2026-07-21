import { productEditSchema } from "@/lib/schema/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function ManageProductsPage() {
  



  const form = useForm<z.infer<typeof productEditSchema>>({
    resolver: zodResolver(productEditSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      mainImage: "",
      productImage: [],
      latestVersion: "",
      isDiscount: false,
      stock: 0,
      discountPrice: 0,
      categoryId: "",
    },
  });

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl">Your Products</h2>
    </div>
  );
}

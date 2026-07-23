'use client'

import EditProductModal from "@/components/sharedComponents/EditProductModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteProductsSpesificByOwner, useGetProductsByOwner } from "@/hooks/products/useProduct";
import { ProductsByOwner } from "@/types";
import { Pencil, Trash2, Package } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ManageProductsPage() {
  const { data: Data, isLoading } = useGetProductsByOwner();
  const [selectedProduct, setSelectedProduct] = useState<ProductsByOwner | null>(null);
  const deleteProduct = useDeleteProductsSpesificByOwner();

  const HandleDelete = (productsId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct.mutateAsync(productsId);
    }
  };

  return (
    <div className="flex flex-col space-y-6 max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your Products</h2>
          <p className="text-sm text-muted-foreground">Manage and edit your published products catalog.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-3">
          <Spinner />
          <p className="text-sm text-muted-foreground">Fetching your products...</p>
        </div>
      ) : !Data || Data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-xl space-y-3 bg-muted/20">
          <Package className="h-10 w-10 text-muted-foreground" />
          <p className="text-base font-semibold">No products found</p>
          <p className="text-xs text-muted-foreground">You haven't created any products yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {Data.map((data) => (
            <div key={data.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow gap-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted flex-shrink-0">
                  <Image src={data.MainImage || "/NoProduct.jpg"} alt={data.name} fill className="object-cover"/>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base leading-none">{data.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {data.category?.title || "Uncategorized"}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-primary">
                    Rp {data.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Stock: {data.Stock} | Version: {data.ProductDescription?.LatestVersion || "v1"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                <Button onClick={() => setSelectedProduct(data)} variant="outline" size="sm" className="flex items-center gap-1.5 text-xs">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button onClick={() => HandleDelete(data.id)} variant="destructive" size="sm" className="flex items-center gap-1.5 text-xs">
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <EditProductModal product={selectedProduct} setState={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

"use client";

import { productEditSchema } from "@/lib/schema/product-schema";
import { ProductsByOwner } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import ImageDropZone from "./ImageDropZone";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import RichTextEditor from "./RichTextEditor";
import { useFetchCategory } from "@/hooks/products/useCategory";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface EditProductModalProps {
  product: ProductsByOwner;
  setState: () => void;
}

export default function EditProductModal({ product, setState }: EditProductModalProps) {
  const { data: category, isLoading: isLoadingCategory } = useFetchCategory();
  const form = useForm<z.infer<typeof productEditSchema>>({
    resolver: zodResolver(productEditSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      description: product.ProductDescription?.description || "",
      price: product.price,
      mainImage: product.MainImage || "",
      productImage: product.ProductImage ? product.ProductImage.map((img) => img.url) : [],
      status: product.status,
      latestVersion: product.ProductDescription?.LatestVersion || "",
      isDiscount: product.IsDiscount,
      stock: product.Stock,
      discountPrice: product.DiscountPrice || 0,
      categoryId: product.categoryId,
    },
  });

  const OnSubmit = () => {

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
          <h2 className="text-xl font-bold tracking-tight">Edit Product</h2>
          <button type="button" onClick={setState} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(OnSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input required type="text" {...field} placeholder="Digital Assets" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (Rp)</FormLabel>
                      <FormControl>
                        <Input min={0} type="number" {...field} placeholder="Product Price" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} placeholder="Product Stock" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isLoadingCategory ? (
                  <Skeleton className="h-10 w-full animate-pulse rounded-lg" />
                ) : (
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} required>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Kategori Produk" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select Category</SelectLabel>
                              {category?.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                  {cat.title}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}/>
                )}

                <FormField
                  control={form.control}
                  name="latestVersion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Version</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="e.g. v1.0.0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-3 pt-6 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="isDiscount"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-medium">Enable Discount</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="discountPrice"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Discount Price (Rp)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} placeholder="Discount Price (Rp)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mainImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Image</FormLabel>
                    <FormControl>
                      <ImageDropZone isMainImage value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gallery Images (Max 5)</FormLabel>
                    <FormControl>
                      <ImageDropZone value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <RichTextEditor value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} required>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Kategori Produk" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                                <SelectItem value="PUBLISHED">
                                    <p className="bg-primary/50 uppercase py-1 px-2 rounded-lg">Published</p>
                                </SelectItem>
                                <SelectItem value="DRAFT">
                                    <p className="bg-red-600/80 uppercase py-1 px-2 rounded-lg">DRAFT</p>
                                </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}/>

              {/* Action Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={setState}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

"use client";

import ImageDropZone from "@/components/sharedComponents/ImageDropZone";
import RichTextEditor from "@/components/sharedComponents/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchCategory } from "@/hooks/products/useCategory";
import { useCreateProductMutation } from "@/hooks/products/useProduct";
import { productCreateSchema } from "@/lib/schema/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function AddProductsPage() {
  const [message, setMessage] = useState<string>("");
  const usePOSTProduct = useCreateProductMutation();
  const {data: category, isLoading : isLoadingCategory, } = useFetchCategory();

  const form = useForm<z.infer<typeof productCreateSchema>>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      mainImage: "",
      latestVersion : "",
      productImage : "",
      price : 0,
      isDiscount: false,
      discountPrice: 0,
      stock: 0,
      categoryId : ''
    },
  });

  const onSubmit = async (values: z.infer<typeof productCreateSchema>) => {
    try {
      console.log (values)
    }catch(error) {

    }
  }

  return (
    <div className="flex gap-2 flex-col h-full">
      <h2 className="mb-8">Create A Product</h2>
      <div className="flex ">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
             control={form.control}
             name="name"
             render={({field}) => (
                <FormItem className="">
                  <FormLabel>Products Name</FormLabel>
                  <FormControl>
                    <Input required type="text" {...field} placeholder="Digital Assets"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
             )}> 
            </FormField>

            <FormField
            control={form.control}
            name="slug"
            render={({field}) => (
              <FormItem>
                <FormLabel> Slug (Auto Generated)</FormLabel>
                <FormControl>
                  <Input  type="text" {...field} placeholder="Product - Slug" className="bg-muted cursor-not-allowed"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}>
            </FormField>

            <FormField
            control={form.control}
            name="mainImage"
            render={({field}) => (
              <FormItem>
                <FormLabel>Main Image</FormLabel>
                <FormControl>
                  <ImageDropZone isMainImage value={field.value} onChange={field.onChange}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}>
            </FormField>
            
            <FormField
            control={form.control}
            name="price"
            render={({field}) => (
              <FormItem>
                <FormLabel> Price </FormLabel>
                <FormControl>
                  <Input min={0} type="number" {...field} placeholder="Product Price"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}>
            </FormField>

            <FormField
            control={form.control}
            name="isDiscount"
            render={({field}) => (
              <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
              </FormControl>
              <FormMessage/>
              </FormItem>
            )}>
            </FormField>

            <FormField
            control={form.control}
            name="discountPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Price</FormLabel>
                <FormControl>
                  <Input type="number"{...field} placeholder="Discount Price (Rp)"/>
                </FormControl> 
                <FormMessage/>
              </FormItem>
            )}>
            </FormField>

            <FormField
            control={form.control}
            name="stock"
            render={({field}) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="Product Stock"/>
                </FormControl> 
                <FormMessage/>
              </FormItem>
            )}>

            </FormField>

            {isLoadingCategory ? (
              <Skeleton className="h-10 w-full animate-pulse rounded-lg" />
            ) : (
            <FormField
            control={form.control}
            name="categoryId"
            render={({field}) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} required {...field}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kategori Produk"/>
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
                  <FormMessage/>
              </FormItem>
            )}>
            </FormField>
            )}
            
            <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <FormLabel>Description Product's</FormLabel>
                <FormControl>
                  <RichTextEditor value={field.value} onChange={field.onChange}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}>
            </FormField>

            <FormField
            control={form.control}
            name="productImage"
            render={({field}) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <ImageDropZone value={field.value} onChange={field.onChange}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}>
            </FormField>

             <FormField
            control={form.control}
            name="latestVersion"
            render={({field}) => (
              <FormItem>
                <FormLabel>Version</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}>
            </FormField>

            <Button type="submit" className="">
              Create A Product
            </Button>
          </form>
        </Form>
        
      </div>
    </div>
  );
}

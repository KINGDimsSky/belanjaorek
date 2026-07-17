"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productCreateSchema } from "@/lib/schema/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function AddProductsPage() {
  const [submitTransition, startSubmitTransition] = useTransition();
  const [message, setMessage] = useState<string>("");

  const form = useForm<z.infer<typeof productCreateSchema>>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
      name: "",
      slug: "",
      image: "/NoProduct.jpg",
      price : 0,
      isDiscount: false,
      discountPrice: 0,
      stock: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof productCreateSchema>) => {


    startSubmitTransition(() => {

    })
  }

  return (
    <div className="flex gap-2 flex-col h-full">
      <h2 className="mb-8">Create A Product</h2>
      <div className="flex ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
             control={form.control}
             name="name"
             render={({field}) => (
                <FormItem>
                  <FormLabel>Products Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Digital Assets"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
             )}>
                
            </FormField>
          </form>
        </Form>
      </div>
    </div>
  );
}

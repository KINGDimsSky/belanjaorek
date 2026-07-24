"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { commentarySchema } from "@/lib/schema/commentary-schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateCommentaryByUser } from "@/hooks/products/useCommentary";

export default function AddCommentary({ productsId }: { productsId: string }) {
  const createComment = useCreateCommentaryByUser();
  const form = useForm<z.infer<typeof commentarySchema>>({
    resolver: zodResolver(commentarySchema),
    defaultValues: {
      productId: productsId,
      subject: "",
      commentary: "",
    },
  });

  const onSubmit = (values: z.infer<typeof commentarySchema>) => {
    createComment.mutateAsync(values);

    form.reset();
  };

  return (
    <div className="flex flex-col w-full mt-6 border-t">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    {...field}
                    placeholder="Digital Assets"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="commentary"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Commentary</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    {...field}
                    placeholder="Digital Assets"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </div>
  );
}

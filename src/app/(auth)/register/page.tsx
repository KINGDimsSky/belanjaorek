"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/lib/schema/auth-schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterUser } from "@/lib/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [message, Setmessage] = useState<string | undefined>('');
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    RegisterUser(values)
    .then((data) => {
      if (!data.status){
        return Setmessage(data.message)
      }

      form.reset();
      router.push('/login')
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-96 border border-input bg-background shadow-sm py-8 px-8 rounded-lg">
        {message && <p className="text-sm mb-2 text-red-500">{message}</p>}
        <h2 className="font-semibold text-2xl mb-1">Welcome Stranger!</h2>
        <p className="mb-10 tracking-wide font-extralight text-xs">
          Welcome Stranger!, Please enter your details.
        </p>
        <div className="">
          <Button variant={"outline"} size={"sm"} className="w-full">
            <p>Register With Google</p>
            <FcGoogle />
          </Button>
          <Button variant={"outline"} size={"sm"} className="w-full mt-4">
            <p>Register With Github</p>
            <FaGithub />
          </Button>
        </div>
        <p className="text-center text-sm mt-6 mb-1">Or</p>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="Tyler@example.com"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Tyler Durden"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="****" />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="****" />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant={"default"}
                size={"sm"}
                className="w-full text-white">
                Register
              </Button>
            </form>
          </Form>
        </div>
        <p className="flex gap-2 items-center text-xs font-extralight mt-6">
          Already Have an Account?
          <Link className="font-semibold hover:text-primary" href={"/login"}>
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

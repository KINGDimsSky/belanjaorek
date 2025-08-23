'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/lib/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import z from "zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage () {
    const [Message, SetMessage] = useState<string | undefined>('');
    const [Loading, SetLoading] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues : {
            email : "",
            password: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
      SetLoading(true)
      SetMessage('');

      const result = await signIn('credentials', {
        ...values,
        redirect : false
      })

      if (result?.error) {
        SetMessage("Email Or Password Invalid!");
        SetLoading(false)
      }else if (result?.ok){
        form.reset();
         SetLoading(true);
        router.push('/');
      }
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-96 border border-input bg-background shadow-sm py-8 px-8 rounded-lg">
        {Message && <p className="text-sm mb-2 text-red-500">{Message}</p>}
        <h2 className="font-semibold text-2xl mb-1">Welcome People!</h2>
        <p className="mb-10 tracking-wide font-extralight text-xs">
          Welcome back!, Please enter your details.
        </p>
        <div className="">
          <Button variant={"outline"} size={"sm"} className="w-full">
            <p>Login With Google</p>
            <FcGoogle />
          </Button>
          <Button variant={"outline"} size={"sm"} className="w-full mt-4">
            <p>Login With Github</p>
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
                      <Input {...field} type="email" placeholder="Tyler@example.com"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} placeholder="****"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              <Button
                type="submit"
                disabled={Loading}
                variant={"default"}
                size={"sm"}
                className={`w-full text-white ${Loading ? "bg-foreground disabled: cursor-progress text-background" : ""}`}>
                {Loading ? "Loading..." : "Login"}
              </Button>
            </form>
          </Form>
        </div>
        <p className="flex gap-2 items-center text-xs font-extralight mt-6">
          Don't Have an Account?
          <Link className="font-semibold hover:text-primary" href={"/register"}>
            Register
          </Link>
        </p>
        <p className="flex gap-2 items-center text-xs font-extralight mt-2">
          Forgot Password ?
          <Link
            className="font-semibold hover:text-primary"
            href={"/forgotpassword"}>
            Restart Password
          </Link>
        </p>
      </div>
    </div>
    )
}
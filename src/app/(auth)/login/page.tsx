'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/lib/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import z from "zod";

export default function LoginPage () {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues : {
            emailOrUsername : "",
            password: "",
        }
    })

    return (
      <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-96 border border-input bg-background shadow-sm py-8 px-8 rounded-lg">
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
            <form action={''} className="space-y-4 mb-8">
              <FormField
                control={form.control}
                name="emailOrUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Tyler@example.com"/>
                    </FormControl>
                  </FormItem>
                )}/>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="****"/>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Button
            type="submit"
            variant={"default"}
            size={"sm"}
            className="w-full text-white">
            Login
          </Button>
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
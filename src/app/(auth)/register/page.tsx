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

export default function RegisterPage() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onsubmit = (Formdata : FormData) => {

  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-96 border border-input bg-background shadow-sm py-8 px-8 rounded-lg">
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
            <form action={''} className="space-y-4 mb-8">
              <FormField
                control={form.control}
                name="email"
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Tyler Durden"/>
                    </FormControl>
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
                      <Input type="password" placeholder="****" />
                    </FormControl>
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
                      <Input type="password" placeholder="****" />
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
            Register
          </Button>
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

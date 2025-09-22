"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner"

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider attribute={"class"} defaultTheme="dark" enableSystem disableTransitionOnChange>
        {children}
        <Toaster position="top-center"/>
      </ThemeProvider>
    </SessionProvider>
  );
}
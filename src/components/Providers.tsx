"use client";

import {QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner"
import { useState } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
  () =>
  new QueryClient({
    defaultOptions : {
      queries: {
        staleTime: 120 * 1000,
        refetchOnWindowFocus: false,  
      }
    }
  }) 
  )

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute={"class"} defaultTheme="dark" enableSystem disableTransitionOnChange>
        {children}
        <Toaster position="top-center"/>
      </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const poppins = Poppins({
  subsets: ['latin'],
  weight : ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: "BelanjaoRek",
  description: "belanjaorek Most Best Marketplace For Digital Assets Like Icons, Image, Rendering, etc.. powered By NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}`}>
        <ThemeProvider attribute={"class"} defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

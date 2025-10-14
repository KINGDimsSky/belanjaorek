import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { getWishlistIdsAction } from "@/lib/actions";
import UseWishlistInitializer from "@/components/sharedComponents/WhislistInitializer";

const poppins = Poppins({
  subsets: ['latin'],
  weight : ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: "BelanjaoRek",
  description: "belanjaorek Most Best Marketplace For Digital Assets Like Icons, Image, Rendering, etc.. powered By NextJS",
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const initialWhislistsIds = await getWishlistIdsAction();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}`}>
        <Providers>
          <UseWishlistInitializer initialWishlistIds={initialWhislistsIds}/>
          {children}
        </Providers>
      </body>
    </html>
  );
}

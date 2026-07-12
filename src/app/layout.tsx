import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import UseWishlistInitializer from "@/components/sharedComponents/WhislistInitializer";
import { getWishlistIdsAction } from "@/actions/wishlist.action";
import { getCartIdsAction } from "@/actions/cart.action";

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
  const initialCartIds = await getCartIdsAction();
  // Dilanjutkan Nanti Untuk Progress Cart sync database

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

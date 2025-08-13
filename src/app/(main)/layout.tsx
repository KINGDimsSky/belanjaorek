import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import { ReactNode } from "react";

export default function LayoutMain({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Navbar />
        {children}
      <Footer />
    </div>
  );
}

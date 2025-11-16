import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react";

// 1. Definisikan tipe untuk setiap item breadcrumb
type BreadCrumbItemType = {
  label: React.ReactNode; // Gunakan ReactNode agar bisa berisi teks atau ikon
  href: string;
};

// 2. Definisikan props untuk komponen utama
interface BreadCrumbProps {
  items: BreadCrumbItemType[];
  textSize : string
}

export default function BreadCrumb({ items, textSize }: BreadCrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className={textSize}>
        {/* 3. Loop melalui array 'items' */}
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          
          return (
            // Gunakan Fragment untuk key yang benar pada separator
            <Fragment key={item.href}>
              <BreadcrumbItem>
                {/* 4. Jika ini item terakhir, render sebagai teks. Jika tidak, render sebagai Link. */}
                {isLastItem ? (
                  <span className="text-foreground cursor-default">
                    {item.label}
                  </span>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              
              {/* 5. Tampilkan separator jika bukan item terakhir */}
              {!isLastItem && (
                <BreadcrumbSeparator/>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
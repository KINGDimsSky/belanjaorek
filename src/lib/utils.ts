import { clsx, type ClassValue } from "clsx"
import { Metadata } from "next";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function RemoveSpaceAndReplaceWithHypen (string : string) {
  return string.toLowerCase().replace(/[^\w\-]+/g, '-')
}

export function constructMetadata({
  title = 'Belanjaorek - The Best Marketplace For Digital Assets',
  description = 'Belanjaorek Selling High Quality Assets Like Models, Icons, Mockup, and Others... Made By DimsSky',
  image = '/kncstudio.png',
  icons = '/logo.png',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@joshtriedcoding',
    },
    icons,
    metadataBase: new URL('https://digitalhippo.up.railway.app'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
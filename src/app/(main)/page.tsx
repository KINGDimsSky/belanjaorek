import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ForYouProduct from "@/components/sharedComponents/ForYou-product";
import CarouselSlide from "@/components/sharedComponents/Carousel-Slide";
import { Button } from "@/components/ui/button";
import { GrLinkNext } from "react-icons/gr";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center mt-20">
      <MaxWidthWrapper className="flex flex-col items-center">
        <div className="flex flex-col gap-2 items-center w-[55rem]">
          <h2 className="text-5xl font-bold tracking-tight">High Quality For Digital Assets</h2>
          <h2 className="text-5xl font-bold tracking-tight"> Marketplace <span className="text-primary">Belanjaorek</span></h2>
          <p className="mt-3 w-[36rem] text-center text-sm text-foreground/85 font-light tracking-tight">
            With Belanjaorek you can find the assets you are looking for, with
            high premium quality, affordable prices, with Belanjaorek We Said Happy Shopping!
          </p>
        </div>
        <div className="flex flex-col w-full mt-28">
          <h1 className="font-bold text-3xl uppercase tracking-wider mb-4">What's HOT</h1>
            <CarouselSlide/>
          <div className="">
            <h2 className="font-bold text-2xl uppercase tracking-tight mt-24 mb-4">For You</h2>
            <ForYouProduct/>
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="mt-24 bg-foreground/5 w-full mb-24 pt-24">
        <MaxWidthWrapper className="flex gap-4 justify-between ">
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-sm tracking-tight font-semibold">Get The Newest Collection of Assets, Design, SFX, Unity Assets,  Icons & SAMP Assets Digital at Belanjaorek</h2>
            <p className="text-xs tracking-tight font-light">
              Welcome to the official site of Belanjaorek where you can buy high quality sports
              equipment and accessories. Belanjaorek Official Online Store provides you the best products
              from sport shoes, and sneakers, to other sports accessories for all your sports needs.
              There are many kinds of shoes that will fit you on every occasion and make you comfortable
              while exercising. At Belanjaorek Official Online Store, you can find various top products
              such as Ace & X football boots, adidas Originals, Training Shoes, Running Tops, Women Sports Bras,
              Sport Accessories and many more. Belanjaorek Official Online Store is constantly being updated 
              so you can buy from our newest collections of shoes, apparel, and sport accessories. 
              Find your favourite shoes from for men, women, and kids only at our official store
            </p>
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            <h2 className="text-sm tracking-tight font-semibold">Belanjaorek Provide All Your Assets Need</h2>
            <p className="text-xs tracking-tight font-light">
              Looking for sports equipment that can make your performance better and more comfortable while
              exercising? There’s only one place that can provide all your sporting needs from shoes to
              accessories, Belanjaorek Official Online Store. Belanjaorek provides sports equipment 
              from training shoes, and running pants, to sport accessories for men, women and kids. 
              Belanjaorek Official Store offers many deals if you shop online; from free delivery if you 
              shop a minimal of IDR 900,000, easy returns, fast response, and many more. Buy your sports 
              shoes for all type of sports only at Belanjaorek Indonesia.
            </p>
          </div>
        </MaxWidthWrapper>
        <div className="w-full bg-foreground py-8 mt-12">
          <MaxWidthWrapper className="flex gap-4 justify-center items-center">
            <h2 className="w-2/5 font-extrabold text-background text-3xl uppercase tracking-tight">register Your Email For News And Special Offers</h2>
            <Button size={'sm'} variant={'outline'} className="flex justify-between rounded-none py-8 px-4 w-1/4">
              <p className="font-semibold tracking-wide text-sm ">Sign Up For Free</p> 
              <GrLinkNext />
            </Button>
          </MaxWidthWrapper>
        </div>
      </div>
    </div>
  );
}

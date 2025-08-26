import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CarouselSlide from "@/components/sharedComponents/Carousel-Slide";
import ForYouProduct from "@/components/sharedComponents/ForYou-product";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center mt-20">
      <MaxWidthWrapper className="flex flex-col items-center">
        <div className="flex flex-col gap-2 items-center w-[55rem]">
          <h2 className="text-5xl font-bold tracking-tight">High Quality For Digital Assets</h2>
          <h2 className="text-5xl font-bold tracking-tight"> Marketplace <span className="text-primary"> Belanjaorek</span></h2>
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
      <div className="mt-24 bg-foreground/10 w-full">
        <MaxWidthWrapper>
          <h2>Anjay Mabar</h2>
        </MaxWidthWrapper>
      </div>
    </div>
  );
}

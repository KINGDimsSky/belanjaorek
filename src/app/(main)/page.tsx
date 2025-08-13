import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center mt-20">
      <MaxWidthWrapper className="flex flex-col items-center">
        <div className="flex flex-col gap-2 items-center w-[55rem]">
          <h2 className="text-5xl font-bold tracking-tight">High Quality For Digital Assets</h2>
          <h2 className="text-5xl font-bold tracking-tight">Marketplace <span className="text-primary">Belanjaorek</span></h2>
        </div>
        <div className="mt-12">
            
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function DetailedProductLoadingUI() {
  return (
    <div className="flex flex-col min-h-screen">
      <MaxWidthWrapper>
        <div className="flex gap-2 items-center mt-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton className="w-14 h-3 rounded-md" key={i} />
          ))}
          <Skeleton className="w-36 h-3 rounded-md" />
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col">
            <Skeleton className="w-[35rem] h-[25rem] rounded-md mt-6" />
            <Skeleton className="w-full h-5 rounded-md mt-4" />
            <div className="flex gap-4 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton className="w-24 h-16 rounded-md" key={i} />
              ))}
            </div>
            <Skeleton className="w-full h-44 rounded-md mt-8 mb-12" />
          </div>
          <div className="flex flex-col">
            <Skeleton className="w-48 h-5 rounded-md mt-6" />
            <Skeleton className="w-80 h-8 rounded-md mt-4" />
            <Skeleton className="w-96 h-4 rounded-md mt-6" />
            <Skeleton className="w-36 h-6 rounded-md mt-4" />
            <Skeleton className="w-48 h-8 rounded-md mt-8" />
            <Skeleton className="w-80 h-4 rounded-md mt-4" />
            <Skeleton className="w-48 h-5 rounded-md mt-4" />
            <Skeleton className="w-64 h-3 rounded-md mt-4" />
            <div className="flex justify-between">
              <Skeleton className="w-80 h-10 rounded-md mt-4" />
              <Skeleton className="w-12 h-10 rounded-md mt-4" />
            </div>
            <Skeleton className="w-96 h-3 rounded-md mt-4" />
            <Skeleton className="w-96 h-32 rounded-md mt-8" />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

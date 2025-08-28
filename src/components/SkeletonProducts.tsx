import { Skeleton } from "./ui/skeleton";

export default function SkeletonProducts() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex justify-between mt-2">
        <div className="flex gap-4">
          <Skeleton className="w-14 h-6 rounded-none" />
          <Skeleton className="w-14 h-6 rounded-none" />
          <Skeleton className="w-14 h-6 rounded-none" />
          <Skeleton className="w-14 h-6 rounded-none" />
        </div>
        <div className="">
          <Skeleton className="w-14 h-6 rounded-none" />
        </div>
      </div>
      <div className="flex gap-4 flex-wrap mt-12">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Skeleton key={idx} className="w-64 h-80"/>
        ))}
      </div>
    </div>
  );
}

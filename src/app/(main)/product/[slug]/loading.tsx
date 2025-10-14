import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { FaCheck, FaTruckMoving } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function DetailedProductLoadingUI() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b border-foreground/15 border-t border-t-foreground/5 py-3">
        <MaxWidthWrapper className="flex gap-16 justify-center">
          <div className="flex hover:underline cursor-pointer items-center gap-2">
            <FaTruckMoving />
            <h2 className="font-medium tracking-tight uppercase text-sm">
              {" "}
              Free Delivery On Orders Above RP 900k{" "}
            </h2>
          </div>
          <div className="flex hover:underline cursor-pointer items-center gap-2">
            <IoMdMail />
            <h2 className="font-medium tracking-tight uppercase text-sm">
              {" "}
              CHAT WITH US{" "}
            </h2>
          </div>
          <div className="flex hover:underline cursor-pointer items-center gap-2">
            <FaCheck />
            <h2 className="font-medium tracking-tight uppercase text-sm">
              {" "}
              Contact Us{" "}
            </h2>
          </div>
        </MaxWidthWrapper>
      </div>
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

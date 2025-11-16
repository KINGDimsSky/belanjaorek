import { FaCheck, FaTruckMoving } from "react-icons/fa";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { IoMdMail } from "react-icons/io";

export default function TopBannerComponents() {
  return (
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
  );
}

import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

type BtnWithLogoProps = {
    id ?: number
    text : string;
    icon : IconType;
    className ?: string;
    onClick ?: () => void;
}

export default function BtnWithLogo({id, onClick,  text, icon : Icon, className} : BtnWithLogoProps) {
  return (
    <div onClick={onClick} className={cn(`flex gap-2 px-3 text-background items-center text-sm cursor-pointer hover:bg-background/10 transition-all duration-200 rounded-md p-2`, className)}>
      <Icon className="w-5 h-5"/>
      <p>{text}</p>
    </div>
  );
}

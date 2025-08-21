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
    <div onClick={onClick} className={cn(`flex gap-2 px-3 items-center cursor-pointer hover:bg-foreground/10 transition-all duration-200 rounded-md p-2`, className)}>
      <Icon className="w-4 h-4"/>
      <p className="text-left text-sm outline-none ring-sidebar-ring">{text}</p>
    </div>
  );
}

import { FaStar } from "react-icons/fa";

export default function ClientRating() {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center mb-2">
        <div className="relative rounded-full w-6 h-6 bg-red-400">
          {/* Image nya nanti disini */}
        </div>
        <p className="text-sm tracking-tight">KINGDimsSky</p>
        <p className="text-sm ml-4 tracking-tighter text-foreground/35">
          11 October 2025
        </p>
      </div>
      <div className="flex gap-4 items-center mb-4">
        <div className="flex text-xs text-primary">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <p className="font-medium tracking-tight text-sm">
          Good Quality, Very Recommended For SAMP
        </p>
      </div>
      <p className="text-xs tracking-tight w-[28rem]">
        Well Very Helpful For Roleplaying FnG On Jogjagamers Roleplay, High
        Quality, And To Many Assets Already Included On This modpack
      </p>
    </div>
  );
}

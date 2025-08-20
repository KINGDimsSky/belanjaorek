'use client'

import { Smile } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react"
import { IoMdClose } from "react-icons/io";
import BtnWithLogo from "../cta/BtnWithLogo";
import { PiSignOutBold } from "react-icons/pi";
import { CiCloudMoon } from "react-icons/ci";
import { useTheme } from "next-themes";
import { UserNav, pagesNav } from "@/lib/const/sidebar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MobileNav ({state, setState} : {state ?: boolean, setState : React.Dispatch<React.SetStateAction<boolean>>}) {
    const ref = useRef<HTMLDivElement>(null);
    const {theme, setTheme} = useTheme();
    const {data: session, status} = useSession();
    const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setState(false);
      }
    }
    if (state) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [state, setState]);

    return (
        <div  className="fixed flex justify-end top-0 z-10 min-h-screen min-w-full bg-black/65">
            <div ref={ref} className="relative bg-foreground w-80 py-4 px-4 rounded-lg border border-background/40">
                <div className="flex items-center gap-2">
                  <div className="relative w-12 h-12 rounded-full object-cover overflow-hidden">
                    <Image src={'/dimas.jpg'} width={400} height={400} alt="User Profile" className=""/>
                  </div>
                  <div className="flex flex-col ">
                    <h2 className="text-sm font-medium text-background">{session?.user?.name}</h2>
                    <h2 className="text-sm text-background/75">Dimas Zulkarnain</h2>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <CiCloudMoon onClick={() => setTheme(theme === 'dark' ? "light" : 'dark' )} className="text-background w-5 h-5 cursor-pointer"/>
                    <IoMdClose onClick={() => setState(!state)} className="text-background cursor-pointer w-5 h-5"/>
                  </div>
                </div>
                  <BtnWithLogo icon={Smile} text="Account Status" className="mt-5"/>
                <div className="border-t border-gray-300/40 mt-3"></div>
                <div className="flex flex-col mt-4 gap-2">
                  {UserNav.map((data) => (
                    <BtnWithLogo onClick={() => router.push(data.href)} id={data.id} key={data.id} text={data.name} icon={data.icon} />
                  ))}
                </div>
                <div className="border-t border-gray-300/40 mt-3 mb-3"></div>
                <div className="flex flex-col mt-4 gap-2">
                  {pagesNav.map((data) => (
                    <BtnWithLogo id={data.id} key={data.id} text={data.name} icon={data.icon} />
                  ))}
                </div>
                <div className="border-t border-gray-300/40 mt-3 mb-3"></div>
                <BtnWithLogo onClick={() => signOut()} key={2} text="Sign out" icon={PiSignOutBold}/>
            </div>
        </div>
    )
}
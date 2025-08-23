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
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { useBodyScrollLock } from "@/hooks/use-body-scroll";

export default function MobileNav ({state, setState} : {state : boolean, setState : React.Dispatch<React.SetStateAction<boolean>>}) {
    const ref = useRef<HTMLDivElement>(null);
    const {theme, setTheme} = useTheme();
    const {data: session, status} = useSession();
    const router = useRouter();
    useBodyScrollLock(state);
    useOnClickOutside(ref, () => setState(false));

    return (
        <div className="fixed flex justify-end top-0 z-10 min-h-screen min-w-full bg-black/65">
            <div ref={ref} className="relative bg-background w-80 py-4 px-4 rounded-lg border border-foreground/25">
                <div className="flex items-center gap-2">
                  <div className="relative w-12 h-12 rounded-full object-cover overflow-hidden">
                    <Image src={session?.user?.image || ''} width={400} height={400} alt="User Profile" className=""/>
                  </div>
                  <div className="flex flex-col ">
                    <h2 className="text-sm font-medium">{session?.user?.email}</h2>
                    <h2 className="text-sm">{session?.user?.name}</h2>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <CiCloudMoon onClick={() => setTheme(theme === 'dark' ? "light" : 'dark' )} className="w-5 h-5 cursor-pointer"/>
                    <IoMdClose onClick={() => setState(!state)} className="cursor-pointer w-5 h-5"/>
                  </div>
                </div>
                  <BtnWithLogo icon={Smile} text="Account Status" className="mt-5"/>
                <div className="border-t border-foreground/35 mt-1"></div>
                <div className="flex flex-col mt-2 gap-2">
                  {UserNav.map((data) => (
                    <BtnWithLogo onClick={() => router.push(data.href)} id={data.id} key={data.id} text={data.name} icon={data.icon} />
                  ))}
                </div>
                <div className="border-t border-foreground/35 mt-3 mb-1"></div>
                <div className="flex flex-col mt-2 gap-2">
                  {pagesNav.map((data) => (
                    <BtnWithLogo id={data.id} key={data.id} text={data.name} icon={data.icon} />
                  ))}
                </div>
                <div className="border-t border-foreground/35 mt-3 mb-1"></div>
                <BtnWithLogo onClick={() => signOut()} key={2} text="Sign out" icon={PiSignOutBold}/>
            </div>
        </div>
    )
}
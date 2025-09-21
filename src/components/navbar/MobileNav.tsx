'use client'

import { Smile } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react"
import { IoMdClose } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { CiCloudMoon } from "react-icons/ci";
import { useTheme } from "next-themes";
import { UserNav, pagesNav } from "@/lib/const/sidebar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { useBodyScrollLock } from "@/hooks/use-body-scroll";
import { Button } from "../ui/button";

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
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={session?.user?.image || ''} width={48} height={48} alt="User Profile" className={`${session?.user?.image ? "object-cover" : "object-contain bg-gray-100"}`}/>
                  </div>
                  <div className="flex flex-col ">
                    <h2 className="text-sm font-medium truncate max-w-[180px]" title={session?.user?.email || ''}>{session?.user?.email}</h2>
                    <h2 className="text-sm">{session?.user?.name}</h2>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <CiCloudMoon onClick={() => setTheme(theme === 'dark' ? "light" : 'dark' )} className="w-5 h-5 cursor-pointer"/>
                    <IoMdClose onClick={() => setState(!state)} className="cursor-pointer w-5 h-5"/>
                  </div>
                </div>
                  <Button onClick={() => router.push('/settings')} variant={'ghost'} size={'sm'} className="justify-start gap-2 px-2 rounded-md w-full mt-4">
                    <Smile className="w-5 h-5"/>
                    <h2 className="text-sm">Account Status</h2>
                  </Button>
                <div className="border-t border-foreground/35 mt-1"></div>
                <div className="flex flex-col mt-2 gap-2">
                  {UserNav.map((data) => (
                    <Button onClick={() => router.push(data.href)} key={data.id} variant={'ghost'} size={'sm'} className="justify-start gap-2 px-2 rounded-md">
                      <data.icon className="w-5 h-5"/>
                      <h2 className="text-sm">{data.name}</h2>
                    </Button> 
                  ))}
                </div>
                <div className="border-t border-foreground/35 mt-3 mb-1"></div>
                <div className="flex flex-col mt-2 gap-2">
                  {pagesNav.map((data) => (
                    <Button onClick={() => router.push(data.href)} key={data.id} variant={'ghost'} size={'sm'} className="justify-start gap-2 px-2 rounded-md">
                      <data.icon className="w-5 h-5"/>
                      <h2 className="text-sm">{data.name}</h2>
                    </Button>
                  ))}
                </div>
                <div className="border-t border-foreground/35 mt-3 mb-1"></div>
                <Button onClick={() => signOut()} variant={'ghost'} size={'sm'} className="justify-start gap-2 px-2 rounded-md w-full mt-1">
                  <PiSignOutBold className="w-5 h-5"/>
                  <h2 className="text-sm">Sign Out</h2>
                </Button>
            </div>
        </div>
    )
}
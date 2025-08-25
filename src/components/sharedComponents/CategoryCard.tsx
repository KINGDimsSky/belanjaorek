import Image from "next/image";
import Link from "next/link";

export default function CategoryCard ({href} : {href ?: string}) {
    return (
        <div className="flex flex-col">
          <div className="relative w-80 h-[26rem] bg-yellow-200 mb-6">
            <Image src={'/images/adidasxminecraft.jpg'} alt="adidasxminecraft" width={500} height={500}/>
          </div>
          <div className="">
            <h2 className="font-semibold text-sm">adidas x MINECRAFT</h2>
            <p className="text-xs tracking-wide mt-2 mb-8">Craft your world, play your game.</p>
            <Link href={'/shop'} className="text-sm tracking-tight  underline uppercase font-semibold cursor-pointer">shop now</Link>
          </div>
        </div>
    )
}
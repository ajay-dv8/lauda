import { Poppins } from "next/font/google"
import Image from "next/image";
import logo from "@/public/logo.svg"
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets:["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const Logo = () => {
  return (
    <Link href="/" className="flex flex-row items-center gap-x-4">
      <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition"> 
        <div className="rounded-full p1">
          <Image 
            src={logo}
            alt="logo"
            width='32'
            height='32'
          />
        </div>

        <div className={cn(font.className)}>
          <p className="text-lg font-semibold">Lauda</p>
          <p className="text-xs text-muted-foreground">let's praise</p>
        </div>
      </div>
    </Link>
  )
};
import { Poppins } from "next/font/google"
import Image from "next/image";
import logo from "@/public/logo.svg"
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets:["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const Logo = () => {
  return (
    <div className="flex flex-col item-center gap-y-4">
      <div className="bg-white rounded-ful p-1">
        <Image 
          alt=""
          src={logo}
          width={70}
          height={70}
        />
      </div>

      <div className={cn(
        "flex flex-col items-center",
        font.className
        )}>
        <p className="text-xl font-semibold">
          Lauda
        </p>

        <p className= "text-sm text-muted">
          let&apos;s praise
        </p>
      </div>
    </div>
  )
};
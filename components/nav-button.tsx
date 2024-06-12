import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";


type Props ={
    href: string;
    label: string;
    isActive?: boolean;   
}
export const NavButton  = ({
    href,
    label,
    isActive,
}: Props) => {
    return ( 
       <Button
          asChild
          size="sm"
          variant="outline"
          className={cn(
            "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white boarder-none focus-visible:ring-offset-0focus-visible:ring-transparent outline-nono text-white focus:bg-white/30 transition",
            isActive ? "bg-white/10  text-white": "bg-transparent",
          )}
          >
       
      
        <Link href={href}>
        {label}
        </Link>

       </Button>
     );
};
 
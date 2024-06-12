"use client";

import { usePathname, useRouter } from "next/navigation";
import { NavButton } from "./nav-button";
import { Button } from "./ui/button";
import { useMedia } from "react-use";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"; 
import { useState } from "react";

// Define the routes for the navigation
const routes = [
    { href: "/", label: "Overview" },
    { href: "/transactions", label: "Transactions" },
    { href: "/accounts", label: "Accounts" },
    { href: "/categories", label: "Categories" },
    { href: "/settings", label: "Settings" }
];

// Define the Navigation component
export const Navigation = () => {
    // State to manage the sheet open/close status
    const [isOpen, setIsOpen] = useState(false);
    
    // Router hook to programmatically navigate
    const router = useRouter();
    
    // Hook to get the current pathname
    const pathname = usePathname();
    
    // Hook to check if the viewport is mobile size
    const isMobile = useMedia("(max-width: 1024px)", false);

    // Function to handle route change
    const onClick = (href: string) => {
        router.push(href);  // Navigate to the new route
        setIsOpen(false);   // Close the sheet
    };

    // Render the sheet for mobile view
    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}> 
                <SheetTrigger>
                    <Button 
                        variant="outline"
                        size="sm"
                        className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                    >
                        <Menu className="size-4"/>       
                    </Button>
                </SheetTrigger> 
                <SheetContent side="left" className="px-2">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.href === pathname ? "secondary" : "ghost"}
                                onClick={() => onClick(route.href)} // Corrected the error here
                                className="w-full justify-start"
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>    
            </Sheet>
        )
    }

    // Render the navigation for desktop view
    return ( 
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((route) => (
                <NavButton 
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={pathname === route.href}
                />
            ))}
        </nav>
    );
}

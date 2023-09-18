"use client"
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation"
import { cn } from "@/lib/utils";
import { Code2, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { FreeCounter } from "@/components/free-counter";

const poppins = Poppins({weight:"600", subsets:["latin"]});
const poppinsForH5 = Poppins({ weight: "400", subsets: ["latin"] });


const routes = [{
    label:"Dashboard",
    icon:LayoutDashboard,
    href: "/dashboard",
    color:"text-gray-300",
},
{
    label:"Conversation",
    icon:MessageSquare,
    href:"/conversation",
    color:"text-violet-500",
},
{
    label:"Image Generation",
    icon:ImageIcon,
    href:"/image",
        color: "text-emerald-300",
    },
    {
        label: "Video Generation",
    icon:VideoIcon,
    href:"/video",
    color:"text-pink-700",
},
{
    label:"Music Generation",
    icon:Music,
    href:"/music",
    color:"text-orange-700",
},
{
    label:"Code Generation",
    icon:Code2,
    href:"/code",
    color:"text-green-500",
},
{
    label:"Settings",
    icon:Settings,
    href:"/settings",
    color:"text-gray-300",
},
];

interface SidebarProps{
    apiLimitCount:number,
    isPro:boolean,
}

const SideBar = ({apiLimitCount=0,
    isPro = false,
}:SidebarProps) => {
    const pathname=usePathname();
    return ( 
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#000000] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center p1-3 mb-14">
                    <div className="relative w-11 h-11 mr-4">
                        <Image fill alt="logo" src="/logo.gif" sizes="(max-width: 640px) 100vw, 640px" />
                    </div>
                        <div>
                <h1 className={cn("text-3xl font-bold", poppins.className)}>Open GPT</h1>
                        <h5 className={cn("text-sm font-normal", poppinsForH5.className)}>By knightrider</h5>
            </div>
                </Link>
                <div className="space-y-1">
                    {routes.map((route)=>(
                        <Link 
                        href={route.href}
                        key={route.href}
                        className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/30 rounded-lg transition", pathname === route.href ? "text-white bg-white/20":"text-zinc-400")}>        
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-15 w-15 mr-3", route.color)}/>{route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter
            isPro = {isPro}
            apiLimitCount = {apiLimitCount}
            />
        </div>
    );
}
export default SideBar;
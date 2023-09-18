"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypeWriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>The Best All in One AI Tool for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypeWriterComponent
                        options={{
                            strings: [
                                "ChatBot.",
                                "Code Generation.",
                                "Image Generation.",
                                "Music Generation.",
                                "Video Generation.",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Explore anything to everything in just a click.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                        Start Generating for free.
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                Try us for free. 
                No credit card required.
            </div>
        </div>
    )
}
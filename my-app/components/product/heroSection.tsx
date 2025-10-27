"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { Spotlight } from "@/components/ui/spotlight-new";
import Link from "next/link";

function HeroSection() {
    const containerRef = useRef(null);

    return (
        <div className="bg-white min-h-screen relative overflow-hidden" ref={containerRef}>
            {/* Enhanced Spotlight Effect - Much Brighter */}
            {/*<Spotlight*/}
            {/*    gradientFirst="radial-gradient(28.54% 68.72% at 55.02% 31.46%, hsla(220, 100%, 90%, .20) 0, hsla(220, 100%, 75%, .15) 50%, hsla(220, 100%, 60%, .0) 80%)"*/}
            {/*    gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(220, 100%, 95%, .01) 0, hsla(220, 100%, 75%, .12) 80%, transparent 100%)"*/}
            {/*    gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(220, 100%, 90%, .2) 0, hsla(220, 100%, 60%, .08) 80%, transparent 100%)"*/}
            {/*    translateY={-300}*/}
            {/*    width={600}*/}
            {/*    height={1400}*/}
            {/*    smallWidth={280}*/}
            {/*    duration={8}*/}
            {/*    xOffset={120}*/}
            {/*/>*/}


            {/* Background grid effect - More visible */}
            <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
            }}></div>

            {/* Enhanced atmospheric glow */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-400/40 via-purple-400/20 to-transparent rounded-full blur-3xl"></div>

            <ContainerScroll
                titleComponent={
                    <div className="text-white mt-30 relative z-20 mb-20">
                        {/* Enhanced title with brighter glow effect */}
                        <div className="relative">
                            <h1 className="text-4xl md:text-8xl font-bold mb-4 relative z-10">
                                <span className="bg-black bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(96,165,250,0.5)]">
                                    Our Amazing Products
                                </span>
                            </h1>
                        </div>

                        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto relative z-10 drop-shadow-lg">
                            Experience the future of innovation with our cutting-edge solution
                            that transforms the way you work and live.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center relative z-10">
                            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-purple-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)]">
                                Get Started Today
                            </button>
                            <Link href="/contact">
                                <button className="border-3 border-black text-black hover:border-blue-400 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                                    Schedule Consultation
                                </button>
                            </Link>
                        </div>
                    </div>
                }
            >
                {/* Product content with enhanced yellow shadow */}
                <div className="h-150 w-full flex items-center justify-center p-0 relative z-20 shadow-2xl shadow-yellow-500/80">
                    <div className="relative w-full h-full rounded-2xl shadow-[0_0_60px_rgba(234,179,8,0.6),0_0_100px_rgba(234,179,8,0.4)]">
                        <Image
                            alt="Product cover"
                            src="/Pimages/productCover-2.png"
                            fill
                            className="object-cover rounded-2xl relative z-10"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        />
                    </div>
                </div>
            </ContainerScroll>

        </div>
    );
}

export default HeroSection;
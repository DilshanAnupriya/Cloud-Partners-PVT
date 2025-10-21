"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { Spotlight } from "@/components/ui/spotlight-new";
import Link from "next/link";

function HeroSection() {
    const containerRef = useRef(null);

    return (
        <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 min-h-screen relative overflow-hidden" ref={containerRef}>
            {/* Spotlight Effect */}
            <Spotlight
                gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(220, 100%, 85%, .12) 0, hsla(220, 100%, 65%, .04) 50%, hsla(220, 100%, 45%, 0) 80%)"
                gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(220, 100%, 85%, .08) 0, hsla(220, 100%, 65%, .03) 80%, transparent 100%)"
                gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(220, 100%, 85%, .06) 0, hsla(220, 100%, 45%, .02) 80%, transparent 100%)"
                translateY={-300}
                width={600}
                height={1400}
                smallWidth={280}
                duration={8}
                xOffset={120}
            />

            {/* Background grid effect */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
            }}></div>

            {/* Additional atmospheric glow */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl"></div>

            <ContainerScroll
                titleComponent={
                    <div className="text-white mt-30 relative z-20 mb-20">
                        {/* Enhanced title with subtle glow effect */}
                        <div className="relative">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 relative z-10">
                                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                                    Our Amazing Product
                                </span>
                            </h1>
                            {/* Subtle text glow */}
                            <div className="absolute inset-0 text-4xl md:text-6xl font-bold mb-4 text-white/10 blur-sm">
                                Our Amazing Product
                            </div>
                        </div>

                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto relative z-10">
                            Experience the future of innovation with our cutting-edge solution
                            that transforms the way you work and live.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center relative z-10">
                            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                                Get Started Today
                            </button>
                            <Link href="/contact">
                                <button className="border border-gray-600 hover:border-blue-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-500/10 backdrop-blur-sm">
                                    Schedule Consultation
                                </button>
                            </Link>
                        </div>
                    </div>
                }
            >
                {/* Product content with enhanced lighting */}
                <div className="h-150 w-full flex items-center justify-center p-0 relative z-20">
                    <div className="relative w-full h-full">
                        {/* Product glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-purple-500/20 rounded-2xl blur-xl"></div>

                        <Image
                            alt="Product cover"
                            src="/Pimages/productCover-2.png"
                            fill
                            className="object-cover rounded-2xl relative z-10 shadow-2xl"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        />

                        {/* Rim lighting effect */}
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 ring-inset"></div>
                    </div>
                </div>
            </ContainerScroll>

        </div>
    );
}

export default HeroSection;
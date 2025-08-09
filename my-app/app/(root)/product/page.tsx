"use client"
import React, { useEffect, useRef } from 'react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation'; // Adjust path as needed

function Product() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const highlight = container.querySelector('.highlight');

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            highlight.style.background = `radial-gradient(circle 150px at ${x}px ${y}px, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.3), transparent 70%)`;
            highlight.style.transform = `scale(1.05)`;
            highlight.style.transition = `background 0.3s ease, transform 0.2s ease`;
        };

        const handleMouseLeave = () => {
            highlight.style.background = `none`;
            highlight.style.transform = `scale(1)`;
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 min-h-screen relative overflow-hidden" ref={containerRef}>
            {/* Background grid effect */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
            }}></div>
            {/* Mouse highlight effect */}
            <div className="highlight absolute inset-0 pointer-events-none" style={{
                filter: 'blur(50px)',
                willChange: 'background, transform'
            }}></div>

            <ContainerScroll
                titleComponent={
                    <div className="text-white mb-5 relative z-10">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Our Amazing Product
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                            Experience the future of innovation with our cutting-edge solution
                            that transforms the way you work and live.
                        </p>
                        <button className="border-2 p-5 text-3xl font-bold rounded-2xl mt-10 mb-10">
                            Sroll Down
                        </button>
                    </div>
                }
            >
                {/* Product content goes inside the card */}
                <div className="h-150 w-full flex items-center justify-center p-0 relative z-10">
                    <img
                        alt="Product cover"
                        src="/product/productCover.png"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>
            </ContainerScroll>

            {/* Additional content below the scroll container */}
            <div className="px-4 md:px-20 pb-20 relative z-10">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl font-bold mb-6">Why Choose Our Product?</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Our product stands out from the competition with its innovative approach
                        to solving complex problems. Built with modern technology and designed
                        with user experience in mind, it delivers results that exceed expectations.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Product;
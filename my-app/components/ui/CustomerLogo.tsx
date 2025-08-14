"use client"

import React, { useEffect, useRef } from 'react';
import Link from "next/link";

// Extend Window interface to include gsap
declare global {
    interface Window {
        gsap: any;
    }
}

const GoogleProductsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const productsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    // Google products data - more professional
    const products = [
        {
            id: 1,
            name: 'Google Workspace',
            category: 'Productivity Suite',
            color: '#4285F4',
            description: 'Collaborative productivity tools including Gmail, Drive, Docs, and Meet for modern teams.',
            features: ['Real-time collaboration', 'Advanced security', 'Admin controls']
        },
        {
            id: 2,
            name: 'Google Cloud',
            category: 'Cloud Platform',
            color: '#4285F4',
            description: 'Scalable cloud infrastructure and AI/ML services for enterprise applications.',
            features: ['Global infrastructure', 'AI/ML tools', '99.9% uptime SLA']
        },


    ];

    const stats = [
        { label: 'Active Users', value: '3B+', description: 'Monthly active users across products' },
        { label: 'Enterprises', value: '9M+', description: 'Organizations trust Google Workspace' },
        { label: 'Countries', value: '190+', description: 'Countries with Google services' },
        { label: 'Uptime', value: '99.9%', description: 'Enterprise-grade reliability' }
    ];

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = () => {
            if (window.gsap) {
                initAnimations();
            }
        };
        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    const initAnimations = () => {
        const gsap = window.gsap;
        const tl = gsap.timeline({ delay: 0.2 });

        // Set initial states
        gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current], {
            opacity: 0,
            y: 40
        });

        // Convert HTMLCollection to Array for proper typing
        const productChildren = productsRef.current?.children ? Array.from(productsRef.current.children) : [];
        const statsChildren = statsRef.current?.children ? Array.from(statsRef.current.children) : [];

        gsap.set(productChildren, {
            opacity: 0,
            y: 50,
            scale: 0.95
        });

        gsap.set(statsChildren, {
            opacity: 0,
            y: 30
        });

        gsap.set(ctaRef.current, {
            opacity: 0,
            y: 30
        });

        // Professional entrance animations
        tl.to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        })
            .to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.4")
            .to(descriptionRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.5")
            .to(statsChildren, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out"
            }, "-=0.3")
            .to(productChildren, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            }, "-=0.4")
            .to(ctaRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.3");

        // Professional hover animations for product cards
        if (productsRef.current) {
            productChildren.forEach((card) => {
                const cardElement = card as HTMLElement;

                cardElement.addEventListener('mouseenter', () => {
                    gsap.to(cardElement, {
                        y: -4,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });

                cardElement.addEventListener('mouseleave', () => {
                    gsap.to(cardElement, {
                        y: 0,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });
            });
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-gray-200 overflow-hidden relative"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <div className="inline-block mb-4">
                        <span
                            ref={subtitleRef}
                            className="text-sm font-semibold tracking-wider text-gray-600 uppercase"
                        >
                            Enterprise Solutions
                        </span>
                    </div>

                    <h1
                        ref={titleRef}
                        className="text-5xl lg:text-6xl font-light text-gray-900 mb-8 tracking-tight"
                    >
                        Google for
                        <span className="font-medium text-blue-600"> Business</span>
                    </h1>

                    <p
                        ref={descriptionRef}
                        className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
                    >
                        Empower your organization with Google's enterprise-grade solutions.
                        Designed for scalability, security, and seamless collaboration across global teams.
                    </p>
                </div>

                {/* Stats Section */}
                <div
                    ref={statsRef}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl font-light text-blue-600 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-lg font-medium text-gray-900 mb-1">
                                {stat.label}
                            </div>
                            <div className="text-sm text-gray-600 font-light">
                                {stat.description}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Products Grid */}
                <div
                    ref={productsRef}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-400 cursor-pointer"
                            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                        >
                            {/* Product Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                                        {product.category}
                                    </div>
                                    <h3 className="text-2xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                        {product.name}
                                    </h3>
                                </div>
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: product.color }}
                                />
                            </div>

                            {/* Product Description */}
                            <p className="text-gray-600 leading-relaxed mb-6 font-light">
                                {product.description}
                            </p>

                            {/* Features */}
                            <div className="space-y-2">
                                {product.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center text-sm text-gray-700">
                                        <div
                                            className="w-1.5 h-1.5 rounded-full mr-3"
                                            style={{ backgroundColor: product.color }}
                                        />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            {/* Learn More Link */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <button className="text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors duration-300 group-hover:translate-x-1 transform transition-transform">
                                    Learn More →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div ref={ctaRef} className="text-center">
                    <div className="inline-flex flex-col sm:flex-row gap-4">
                        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                            Get Started
                        </button>
                        <Link href="/contact">
                        <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-medium text-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-0.5">
                            Schedule a Demo
                        </button>
                        </Link>

                    </div>

                    <p className="text-gray-500 mt-8 text-lg font-light max-w-2xl mx-auto">
                        Join millions of organizations worldwide that trust Google's enterprise solutions
                        to drive innovation and growth.
                    </p>
                </div>
            </div>

            {/* Subtle Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50 to-transparent opacity-50 rounded-full transform translate-x-48 -translate-y-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gray-50 to-transparent opacity-50 rounded-full transform -translate-x-48 translate-y-48" />
        </section>
    );
};

export default GoogleProductsSection;
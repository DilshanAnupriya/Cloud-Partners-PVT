"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Users, Target, Award, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from "next/link";

const InfoSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        { icon: Award, text: "Certified Zoho Premium Partners" },
        { icon: Target, text: "Strategic implementation approach" },
        { icon: Briefcase, text: "Enterprise-grade solutions" },
        { icon: Users, text: "Dedicated support team" }
    ];

    return (
        <div className="min-h-screen bg-gray-200">
            <div
                className={`container mx-auto px-6 py-20 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">


                        <h1
                            className={`text-5xl lg:text-6xl font-bold text-slate-700 leading-tight transition-all duration-700 delay-300 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        >
                            Unlock Success With{' '}
                            <span className="bg-slate-700 bg-clip-text text-transparent">
                Zoho
              </span>
                        </h1>

                        <h2
                            className={`text-2xl lg:text-3xl font-semibold text-gray-700 transition-all duration-700 delay-400 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        >
                            Your Path To Streamlined Business Solutions
                        </h2>

                        <p
                            className={`text-lg text-gray-600 leading-relaxed transition-all duration-700 delay-500 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        >
                            Welcome to Cloud Partners, where artistry meets technology for business brilliance!
                            We&apos;re Zoho Official Partners specializing in Zoho One Projects, Zoho Creator,
                            Zoho CRM, and API Integration. Our software solutions boost productivity,
                            streamline workflows, and enhance sales, unleashing your team&apos;s potential
                            and making your business processes seamless.
                        </p>

                        <div
                            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 delay-600 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        >
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer transform"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <feature.icon className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        <motion.div
                            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-700 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        >
                            <Link href="/about">


                                <motion.button
                                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    More About Us
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>

                        </motion.div>
                    </div>

                    {/* Right Content */}
                    <div className="relative">
                        <div
                            className={`relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 delay-300 ${
                                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                            }`}
                        >
                            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <Image
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Professional team working on Zoho solutions"
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
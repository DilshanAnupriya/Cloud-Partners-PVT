"use client"
import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Users, Target, Award, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div
                className={`container mx-auto px-6 py-20 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div
                            className={`inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium transition-all duration-700 delay-200 ${
                                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                            }`}
                        >
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            About
                        </div>

                        <h1
                            className={`text-5xl lg:text-6xl font-bold text-gray-900 leading-tight transition-all duration-700 delay-300 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        >
                            Unlock Success With{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
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
                            We're Zoho Official Partners specializing in Zoho One Projects, Zoho Creator,
                            Zoho CRM, and API Integration. Our software solutions boost productivity,
                            streamline workflows, and enhance sales, unleashing your team's potential
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
                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                More About Us
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>

                            <motion.button
                                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Portfolio
                            </motion.button>
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
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Professional team working on Zoho solutions"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating Stats Cards */}
                            <div
                                className={`absolute top-6 right-6 bg-white p-4 rounded-lg shadow-lg transition-all duration-700 delay-800 ${
                                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                                }`}
                            >
                                <div className="text-2xl font-bold text-blue-600">50+</div>
                                <div className="text-sm text-gray-600">Projects Completed</div>
                            </div>

                            <div
                                className={`absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-lg transition-all duration-700 delay-1000 ${
                                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                                }`}
                            >
                                <div className="text-2xl font-bold text-green-600">98%</div>
                                <div className="text-sm text-gray-600">Client Satisfaction</div>
                            </div>
                        </div>

                        {/* Zoho Partner Badge */}
                        <div
                            className={`absolute -bottom-8 -right-8 bg-white p-6 rounded-full shadow-xl border-4 border-blue-100 transition-all duration-1000 delay-1200 ${
                                isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-12'
                            } animate-bounce`}
                            style={{ animationDelay: '1.2s', animationDuration: '2s', animationIterationCount: '3' }}
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-2">
                                    <span className="text-white font-bold text-lg">Z</span>
                                </div>
                                <div className="text-xs font-semibold text-gray-700">Premium</div>
                                <div className="text-xs text-gray-500">Partner</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
"use client"

import React, { useState, useEffect } from 'react';
import {
    Code,
    Smartphone,
    Globe,
    Database,
    Shield,
    BarChart3,
    Cloud,
    Palette,
    ArrowRight,
    CheckCircle,
    Star,
    Users,
    Clock,
    Trophy
} from 'lucide-react';

function Page() {
    const [activeService, setActiveService] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const services = [
        {
            icon: Code,
            title: "Custom Software Development",
            description: "Software solutions built with cutting-edge technologies to meet your specific business requirements.",
            features: ["Full-stack development", "API integration", "Zoho One"],
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50"
        },
        {
            icon: Globe,
            title: "Web Development",
            description: "Modern, responsive websites and web applications that drive engagement and business growth.",
            features: ["Responsive design", "E-commerce solutions", "CMS development", "SEO optimization"],
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-50"
        },
        {
            icon: Cloud,
            title: "Cloud Solutions",
            description: "Scalable cloud infrastructure and migration services to optimize your operations and reduce costs.",
            features: ["Cloud migration", "Infrastructure setup", "DevOps automation", "Cost optimization"],
            color: "from-indigo-500 to-blue-500",
            bgColor: "bg-indigo-50"
        },
        {
            icon: Smartphone,
            title: "Mobile Development",
            description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
            features: ["iOS & Android apps", "React Native", "UI/UX design", "App store optimization"],
            color: "from-green-500 to-teal-500",
            bgColor: "bg-green-50"
        },
        {
            icon: BarChart3,
            title: "Business Automation",
            description: "Streamline operations and increase efficiency with intelligent automation solutions.",
            features: ["Workflow automation", "Process optimization", "Integration services", "ROI tracking"],
            color: "from-yellow-500 to-orange-500",
            bgColor: "bg-yellow-50"
        },

    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
            {/* Hero Section with Background Image */}
            <section className="relative py-20 overflow-hidden pt-50 min-h-screen flex items-center">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')`
                    }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Our <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">Services</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                            Comprehensive technology solutions designed to accelerate your business growth and digital transformation
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25">
                                Get Started
                            </button>
                            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 shadow-xl">
                                View Portfolio
                            </button>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="animate-bounce  ml-110">
                            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From concept to deployment, we provide end-to-end solutions that drive innovation and business success
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        {services.map((service, index) => {
                            const IconComponent = service.icon;
                            const isActive = activeService === index;

                            return (
                                <div
                                    key={index}
                                    className={`group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                                        isActive ? 'scale-105' : ''
                                    }`}
                                    onClick={() => setActiveService(index)}
                                >
                                    <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                                        isActive ? 'border-blue-500' : 'border-transparent hover:border-blue-200'
                                    }`}>
                                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                        <p className="text-gray-600 mb-4">{service.description}</p>

                                        <div className="space-y-2">
                                            {service.features.map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6">
                                            <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                                                Learn More
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            A streamlined, transparent approach to deliver exceptional results
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Discovery", description: "We analyze your business needs, goals, and challenges to create a tailored solution." },
                            { step: "02", title: "Strategy", description: "We craft a detailed plan aligned with your objectives to ensure success." },
                            { step: "03", title: "Execution", description: "Our team implements solutions with precision and industry-leading expertise." },
                            { step: "04", title: "Delivery", description: "We launch your project and provide ongoing support for sustained success." }
                        ].map((process, index) => (
                            <div
                                key={index}
                                className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="absolute -top-4 left-6 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-md">
                                    {process.step}
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{process.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{process.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Page;
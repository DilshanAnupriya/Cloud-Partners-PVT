"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Code, Users, Play, Shield, Database, Cloud, BarChart3, X, Loader2, Sparkles, TrendingUp, Zap } from "lucide-react";
import { BackgroundRippleEffect } from "./background-ripple-effect";
import ProfessionalBackground from "./ProfessionalBackground";

const ModernZohoHero = () => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isIframeLoading, setIsIframeLoading] = useState(true);

    useEffect(() => {
        if (isBookingModalOpen) {
            document.body.style.overflow = 'hidden';
            setIsIframeLoading(true);
            const fallbackTimer = setTimeout(() => setIsIframeLoading(false), 5000);
            return () => {
                document.body.style.overflow = 'unset';
                clearTimeout(fallbackTimer);
            };
        }
    }, [isBookingModalOpen]);

    const services = [
        {
            icon: Code,
            text: "System Integration",
            desc: "Enterprise API & automation",
            color: "text-[#4285F4]",
            iconBg: "bg-[#4285F4]/10",
        },
        {
            icon: Users,
            text: "Consulting Services",
            desc: "Strategic technology advisory",
            color: "text-[#0F9D58]",
            iconBg: "bg-[#0F9D58]/10",
        },
    ];

    const metrics = [
        { label: "Uptime", value: "99.99%", trend: "+0.02%", color: "emerald" },
        { label: "Performance", value: "2.1s", trend: "-0.3s", color: "blue" },
        { label: "Active Users", value: "24.5K", trend: "+12%", color: "purple" },
        { label: "Revenue", value: "$1.2M", trend: "+24%", color: "orange" },
    ];

    const features = [
        { icon: BarChart3, label: "Analytics", color: "bg-gradient-to-br from-blue-500 to-blue-600" },
        { icon: Database, label: "Storage", color: "bg-gradient-to-br from-emerald-500 to-emerald-600" },
        { icon: Cloud, label: "Compute", color: "bg-gradient-to-br from-purple-500 to-purple-600" },
        { icon: Shield, label: "Security", color: "bg-gradient-to-br from-orange-500 to-orange-600" },
    ];

    return (
         <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-white via-white to-gray-200 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 mt-28">
            {/* Professional Background Effects */}
            <ProfessionalBackground />
            
            {/* Ripple Background Effect */}
            <div className="absolute inset-0 pointer-events-none">
                <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />
            </div>
            <div className="px-6 lg:px-12 xl:px-16 py-10 md:py-20 w-full">
                {/* Hero Title Section */}
                <div className="relative z-10 mx-auto max-w-6xl text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-neutral-700 shadow-sm mb-8 animate-[fadeIn_0.6s_ease-out]">
                        <Sparkles className="w-4 h-4 text-[#4285F4]" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Trusted by 500+ enterprises</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-slate-700 dark:text-slate-300 mb-8 animate-[fadeInUp_0.8s_ease-out]">
                        {"Enterprise Cloud Solutions"
                            .split(" ")
                            .map((word, index) => (
                                <span
                                    key={index}
                                    className="mr-2 inline-block animate-[fadeInWord_0.3s_ease-out_forwards]"
                                    style={{
                                        opacity: 0,
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                >
                                    {word === "Cloud" ? (
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] via-[#DB4437] via-[#F4B400] to-[#0F9D58]">
                                            {word}
                                        </span>
                                    ) : word}
                                </span>
                            ))}
                    </h1>

                    <p className="relative z-10 mx-auto max-w-2xl text-xl font-normal text-neutral-600 dark:text-neutral-400 mb-10 animate-[fadeIn_0.8s_ease-out_0.8s_both]">
                        Transform your business with cutting-edge cloud infrastructure and enterprise-grade solutions tailored for modern success.
                    </p>

                    <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 animate-[fadeIn_0.8s_ease-out_1s_both]">
                        <button
                            onClick={() => setIsBookingModalOpen(true)}
                            className="group w-64 transform rounded-lg bg-gradient-to-r from-[#4285F4] to-[#0F9D58] px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center"
                        >
                            Schedule Consultation
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="group w-64 transform rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-8 py-4 text-lg font-medium text-black dark:text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center justify-center">
                            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                            View Case Studies
                        </button>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16 animate-[fadeInUp_0.8s_ease-out_1.2s_both]">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group flex items-start space-x-4 p-6 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-neutral-800 hover:border-blue-300/50 dark:hover:border-blue-700 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                            <div className={`flex-shrink-0 w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <service.icon className={`w-6 h-6 ${service.color}`} />
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-1">{service.text}</div>
                                <div className="text-gray-600 dark:text-gray-400 text-sm">{service.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dashboard Preview - White Professional Theme */}
                <div className="relative z-10 mt-20 animate-[fadeInUp_0.8s_ease-out_1.4s_both] max-w-7xl mx-auto shadow-2xl shadow-amber-500 rounded-2xl ">
                    {/* Floating badge */}
                    <div className="absolute -top-6 -left-6 z-20 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl ">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            <span className="font-bold text-sm">+124% Growth</span>
                        </div>
                    </div>

                    <div className="w-full overflow-hidden rounded-3xl shadow-2xl bg-white border border-gray-200">
                        <div className="p-10">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-2">
                                        Analytics Dashboard
                                    </h3>
                                    <p className="text-slate-600 text-base">Real-time business metrics</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
                                    </div>
                                    <span className="text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 px-5 py-2 rounded-full shadow-lg">
                                        LIVE
                                    </span>
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                                {metrics.map((metric, index) => (
                                    <div
                                        key={metric.label}
                                        className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="flex flex-col">
                                            <div className="text-sm text-slate-500 font-medium mb-3">{metric.label}</div>
                                            <div className="text-3xl font-bold text-slate-900 mb-2">{metric.value}</div>
                                            <div className={`text-sm font-bold text-${metric.color}-600 flex items-center`}>
                                                {metric.trend.startsWith('+') ? '↑' : '↓'} {metric.trend}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Google Cloud Card */}
                            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-gray-200 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center space-x-5">
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-200">
                                                <svg viewBox="0 0 24 24" className="w-10 h-10">
                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 text-xl mb-1">Google Cloud Platform</div>
                                                <div className="text-slate-600 text-base">Enterprise Solutions Partner</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg">
                                            <Shield className="w-5 h-5" />
                                            CERTIFIED
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-6">
                                        {features.map((feature, index) => {
                                            const Icon = feature.icon;
                                            return (
                                                <div
                                                    key={feature.label}
                                                    className="group flex flex-col items-center space-y-3 cursor-pointer"
                                                >
                                                    <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                                        <Icon className="w-7 h-7 text-white" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-700 text-center group-hover:text-slate-900 transition-colors">{feature.label}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {isBookingModalOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]"
                    onClick={() => setIsBookingModalOpen(false)}
                >
                    <div
                        className="relative bg-white dark:bg-neutral-900 rounded-3xl w-full max-w-5xl h-[90vh] overflow-hidden shadow-2xl animate-[scaleIn_0.3s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsBookingModalOpen(false)}
                            className="absolute top-6 right-6 z-20 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-red-500/50 hover:scale-110 hover:rotate-90"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="bg-gradient-to-r from-[#4285F4] to-[#0F9D58] px-8 py-6 border-b border-white/10">
                            <h2 className="text-3xl font-bold text-white">Schedule Your Consultation</h2>
                            <p className="text-blue-50 text-sm mt-2">Choose a convenient time to discuss your enterprise cloud needs</p>
                        </div>

                        {isIframeLoading && (
                            <div className="absolute inset-0 top-[6.5rem] bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-950 z-10 flex flex-col items-center justify-center">
                                <div className="animate-spin mb-6">
                                    <Loader2 className="w-16 h-16 text-[#4285F4]" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Loading Booking System</h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-md text-center">Preparing your consultation scheduling interface...</p>
                                <div className="flex items-center space-x-2 mt-6">
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="w-3 h-3 bg-[#4285F4] rounded-full animate-bounce"
                                            style={{ animationDelay: `${i * 0.2}s` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="h-[calc(100%-6.5rem)]">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://muje-cloudpartners92.zohobookings.com/portal-embed#/cloudpartnerspvtltd"
                                className="border-0"
                                allowFullScreen
                                title="Schedule Consultation"
                                onLoad={() => setIsIframeLoading(false)}
                            />
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes fadeInWord {
                    from {
                        opacity: 0;
                        filter: blur(4px);
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        filter: blur(0px);
                        transform: translateY(0);
                    }
                }
                
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default ModernZohoHero;
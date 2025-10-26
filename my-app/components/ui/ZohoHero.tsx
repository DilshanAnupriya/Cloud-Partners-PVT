"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Code, Users, Play, Shield, Database, Cloud, BarChart3, X, Loader2, Sparkles, TrendingUp, Zap } from "lucide-react";
const useGSAPEffect = (ref: React.RefObject<HTMLElement>, delay = 0) => {
    useEffect(() => {
        if (ref.current) {
            ref.current.style.opacity = "0";
            ref.current.style.transform = "translateY(30px)";

            const timer = setTimeout(() => {
                if (ref.current) {
                    ref.current.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
                    ref.current.style.opacity = "1";
                    ref.current.style.transform = "translateY(0)";
                }
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [ref, delay]);
};

const ModernHero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isIframeLoading, setIsIframeLoading] = useState(true);

    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const dashboardRef = useRef<HTMLDivElement>(null);

    useGSAPEffect(titleRef, 200);
    useGSAPEffect(subtitleRef, 400);
    useGSAPEffect(buttonsRef, 600);
    useGSAPEffect(dashboardRef, 800);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20 - 10,
                y: (e.clientY / window.innerHeight) * 20 - 10
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

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
            bgColor: "bg-blue-50",
            iconBg: "bg-[#4285F4]/10",
            borderColor: "border-blue-100",
        },
        {
            icon: Users,
            text: "Consulting Services",
            desc: "Strategic technology advisory",
            color: "text-[#0F9D58]",
            bgColor: "bg-green-50",
            iconBg: "bg-[#0F9D58]/10",
            borderColor: "border-green-100",
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
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden pt-15">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse"
                    style={{
                        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                        transition: "transform 0.3s ease-out"
                    }}
                />
                <div
                    className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-emerald-200/40 to-blue-200/40 rounded-full blur-3xl animate-pulse"
                    style={{
                        transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
                        transition: "transform 0.3s ease-out",
                        animationDelay: "1s"
                    }}
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            <div ref={heroRef} className="relative z-10 container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[calc(100vh-10rem)]">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-sm">
                            <Sparkles className="w-4 h-4 text-[#4285F4]" />
                            <span className="text-sm font-medium text-gray-700">Trusted by 500+ enterprises</span>
                        </div>

                        <h1 ref={titleRef} className="text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                            <span className="text-gray-900">Enterprise</span>{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] via-[#DB4437] via-[#F4B400] to-[#0F9D58]">
                Cloud
              </span>
                            <br />
                            <span className="text-gray-900">Solutions</span>
                        </h1>

                        <p ref={subtitleRef} className="text-xl text-gray-600 max-w-xl leading-relaxed">
                            Transform your business with cutting-edge cloud infrastructure and enterprise-grade solutions tailored for modern success.
                        </p>

                        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={() => setIsBookingModalOpen(true)}
                                className="group relative bg-gradient-to-r from-[#4285F4] to-[#0F9D58] text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 overflow-hidden"
                            >
                <span className="relative z-10 flex items-center">
                  Schedule Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0F9D58] to-[#4285F4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>

                            <button className="group bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold flex items-center justify-center border-2 border-gray-200 hover:border-[#DB4437] hover:text-[#DB4437] transition-all duration-300 shadow-sm hover:shadow-md">
                                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                                View Case Studies
                            </button>
                        </div>

                        {/* Services Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    style={{ animationDelay: `${800 + index * 100}ms` }}
                                    className="group flex items-start space-x-4 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-blue-300/50 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0"
                                >
                                    <div className={`flex-shrink-0 w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <service.icon className={`w-6 h-6 ${service.color}`} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 text-base mb-1">{service.text}</div>
                                        <div className="text-gray-600 text-sm">{service.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Dashboard */}
                    <div ref={dashboardRef} className="lg:w-1/2 relative">
                        <div className="relative">
                            {/* Floating badge */}
                            <div className="absolute -top-6 -left-6 z-20 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl animate-bounce">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    <span className="font-bold">+124% Growth</span>
                                </div>
                            </div>

                            <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl shadow-blue-500/10 relative overflow-hidden">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                            Analytics Dashboard
                                        </h3>
                                        <p className="text-gray-500 text-sm">Real-time business metrics</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
                                        </div>
                                        <span className="text-xs font-bold text-white bg-gradient-to-r from-[#DB4437] to-red-600 px-4 py-1.5 rounded-full shadow-lg">
                      LIVE
                    </span>
                                    </div>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {metrics.map((metric, index) => (
                                        <div
                                            key={metric.label}
                                            style={{ animationDelay: `${1000 + index * 100}ms` }}
                                            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 cursor-pointer animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-xs text-gray-500 font-medium mb-2">{metric.label}</div>
                                                    <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                                                </div>
                                                <div className={`text-xs font-bold px-3 py-1.5 rounded-full bg-${metric.color}-50 text-${metric.color}-600 border border-${metric.color}-200`}>
                                                    {metric.trend}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Google Cloud Card */}
                                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-2xl" />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                                                    <svg viewBox="0 0 24 24" className="w-8 h-8">
                                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 text-lg">Google Cloud Platform</div>
                                                    <div className="text-gray-500 text-sm">Enterprise Solutions Partner</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg">
                                                <Shield className="w-4 h-4" />
                                                CERTIFIED
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-3">
                                            {features.map((feature, index) => {
                                                const Icon = feature.icon;
                                                return (
                                                    <div
                                                        key={feature.label}
                                                        style={{ animationDelay: `${1400 + index * 100}ms` }}
                                                        className="group flex flex-col items-center space-y-2 cursor-pointer animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0"
                                                    >
                                                        <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                                            <Icon className="w-6 h-6 text-white" />
                                                        </div>
                                                        <span className="text-xs font-semibold text-gray-700 text-center">{feature.label}</span>
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
            </div>

            {/* Booking Modal */}
            {isBookingModalOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]"
                    onClick={() => setIsBookingModalOpen(false)}
                >
                    <div
                        className="relative bg-white rounded-3xl w-full max-w-5xl h-[90vh] overflow-hidden shadow-2xl animate-[scaleIn_0.3s_ease-out]"
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
                            <div className="absolute inset-0 top-[6.5rem] bg-gradient-to-br from-blue-50 to-white z-10 flex flex-col items-center justify-center">
                                <div className="animate-spin mb-6">
                                    <Loader2 className="w-16 h-16 text-[#4285F4]" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Loading Booking System</h3>
                                <p className="text-gray-600 max-w-md text-center">Preparing your consultation scheduling interface...</p>
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

export default ModernHero;
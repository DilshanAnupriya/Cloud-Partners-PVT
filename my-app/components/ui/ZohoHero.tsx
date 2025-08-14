"use client";
import React, { useState, useEffect,  } from "react";
import { ArrowRight, Code, Users, Play, Shield, Database, Cloud, BarChart3 } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const ProfessionalHero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }

        const handleMouseMove = (e:any) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [inView, controls]);

    const partnerships = [
        {
            name: "Google Cloud Platform",
            subtitle: "Enterprise Solutions Partner",
            apps: ["Analytics", "Storage", "Compute", "Security"],
            icon: "/google.webp",
            metrics: [
                { label: "Uptime", value: "99.99%", trend: "+0.02%" },
                { label: "Performance", value: "2.1s", trend: "-0.3s" },
                { label: "Users", value: "24.5K", trend: "+12%" },
                { label: "Revenue", value: "$1.2M", trend: "+24%" },
            ],
        },
    ];

    const services = [
        {
            icon: Code,
            text: "System Integration",
            desc: "Enterprise API & automation solutions",
            color: "text-blue-400",
            bgColor: "bg-gradient-to-br from-slate-800/60 to-slate-900/40",
            iconBg: "bg-blue-500/20",
            borderColor: "border-slate-700/60",
        },
        {
            icon: Users,
            text: "Consulting Services",
            desc: "Strategic technology advisory",
            color: "text-emerald-400",
            bgColor: "bg-gradient-to-br from-slate-800/60 to-slate-900/40",
            iconBg: "bg-emerald-500/20",
            borderColor: "border-slate-700/60",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                // Removed ease property to avoid TypeScript conflicts
            },
        },
    };

    const floatingVariants = {
        animate: {
            y: [-5, 5, -5],
            rotate: [-1, 1, -1],
            transition: {
                duration: 6,
                repeat: Infinity,
                // Removed ease property to avoid TypeScript conflicts
            },
        },
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white overflow-hidden">
            {/* Professional mouse follow effect */}
            <motion.div
                className="fixed w-96 h-96 pointer-events-none z-20 opacity-40"
                animate={{
                    x: mousePosition.x - 192,
                    y: mousePosition.y - 192,
                }}
                transition={{ type: "spring", stiffness: 20, damping: 30 }}
            >
                <div className="w-full h-full bg-gradient-to-r from-blue-500/20 via-slate-400/10 to-emerald-500/20 rounded-full blur-3xl" />
            </motion.div>

            {/* Dark grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:50px_50px] z-0"></div>

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-slate-900/40 z-5"></div>

            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="relative z-30 container mx-auto px-6 pt-20 pb-24"
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 pt-30">
                    <motion.div variants={itemVariants} className="lg:w-1/2 space-y-8">
                        {/* Professional badge */}

                        {/* Dark themed heading */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                                <span className="text-white">Enterprise</span>{" "}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300">
                                    Cloud
                                </span>
                                <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-300">
                                    Solutions
                                </span>{" "}
                                <span className="text-white">for</span>
                                <br />
                                <span className="text-slate-300">Modern Business</span>
                            </h1>
                            <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
                                Streamline operations and accelerate growth with enterprise-grade Google Cloud implementations.
                                Trusted by Fortune 500 companies worldwide.
                            </p>
                        </motion.div>

                        {/* Dark themed buttons */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/contact">
                                <motion.button
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center shadow-lg shadow-blue-500/25"
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 12px 24px rgba(59, 130, 246, 0.35)",
                                        background: "linear-gradient(to right, #3b82f6, #2563eb)",
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Schedule Consultation
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </motion.button>
                            </Link>
                            <motion.button
                                className="border-2 border-slate-600 text-slate-300 px-8 py-4 rounded-xl font-semibold flex items-center justify-center bg-slate-800/30 backdrop-blur-sm hover:bg-slate-700/40 transition-colors"
                                whileHover={{
                                    scale: 1.02,
                                    borderColor: "rgb(71, 85, 105)",
                                    backgroundColor: "rgba(51, 65, 85, 0.4)",
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Play className="mr-2 w-5 h-5 text-slate-400" />
                                View Case Studies
                            </motion.button>
                        </motion.div>

                        {/* Dark themed services */}
                        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`flex items-start space-x-4 p-6 rounded-xl ${service.bgColor} backdrop-blur-sm border ${service.borderColor} hover:shadow-lg hover:shadow-slate-800/50 transition-all duration-300 cursor-pointer`}
                                    whileHover={{
                                        scale: 1.02,
                                        backgroundColor: "rgba(51, 65, 85, 0.4)",
                                    }}
                                >
                                    <motion.div
                                        className={`flex-shrink-0 w-12 h-12 ${service.iconBg} rounded-lg flex items-center justify-center backdrop-blur-sm border border-slate-700/40`}
                                        whileHover={{ rotate: 5, scale: 1.05 }}
                                    >
                                        <service.icon className={`w-6 h-6 ${service.color}`} />
                                    </motion.div>
                                    <div>
                                        <div className="font-semibold text-white text-base mb-1">{service.text}</div>
                                        <div className="text-slate-400 text-sm">{service.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Dark Professional Dashboard */}
                    <motion.div variants={itemVariants} className="lg:w-1/2 relative pl-20">
                        <motion.div
                            className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-8 shadow-2xl shadow-black/20 relative overflow-hidden"
                            whileHover={{
                                scale: 1.01,
                                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
                                borderColor: "rgba(71, 85, 105, 0.8)",
                            }}
                            variants={floatingVariants}
                            animate="animate"
                        >
                            {/* Animated dark background gradient */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-slate-700/10 to-emerald-500/5 rounded-2xl"
                                animate={{
                                    background: [
                                        "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(71, 85, 105, 0.1), rgba(16, 185, 129, 0.05))",
                                        "linear-gradient(135deg, rgba(71, 85, 105, 0.1), rgba(16, 185, 129, 0.05), rgba(59, 130, 246, 0.05))",
                                        "linear-gradient(225deg, rgba(16, 185, 129, 0.05), rgba(59, 130, 246, 0.05), rgba(71, 85, 105, 0.1))",
                                    ],
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            />

                            <div className="relative z-10">
                                {/* Dark themed header */}
                                <motion.div
                                    className="flex items-center justify-between mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">
                                            Analytics Dashboard
                                        </h3>
                                        <p className="text-slate-400 text-sm">Real-time business metrics</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="flex space-x-2">
                                            <motion.div
                                                className="w-2 h-2 bg-emerald-400 rounded-full"
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-blue-400 rounded-full"
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                                            LIVE
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Dark themed metrics grid */}
                                {partnerships[0] && (
                                    <motion.div
                                        className="grid grid-cols-2 gap-4 mb-8"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {partnerships[0].metrics.map((metric, index) => (
                                            <motion.div
                                                key={metric.label}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                                className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-slate-600/40 hover:border-slate-500/60 transition-all duration-300"
                                                whileHover={{
                                                    scale: 1.02,
                                                    backgroundColor: "rgba(51, 65, 85, 0.6)",
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-xs text-slate-400 font-medium mb-1">{metric.label}</div>
                                                        <div className="text-lg font-bold text-white">{metric.value}</div>
                                                    </div>
                                                    <div
                                                        className={`text-xs font-semibold px-2 py-1 rounded ${
                                                            metric.trend.startsWith("+")
                                                                ? "text-emerald-400 bg-emerald-500/20 border border-emerald-500/30"
                                                                : "text-blue-400 bg-blue-500/20 border border-blue-500/30"
                                                        }`}
                                                    >
                                                        {metric.trend}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}

                                {/* Dark themed partnership card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="bg-slate-700/40 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:border-slate-500/70 transition-all duration-300 cursor-pointer relative overflow-hidden"
                                    whileHover={{
                                        scale: 1.01,
                                        backgroundColor: "rgba(51, 65, 85, 0.5)",
                                    }}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-4">
                                            <motion.div
                                                className="w-12 h-12 bg-slate-600/50 backdrop-blur-sm rounded-lg flex items-center justify-center border border-slate-500/40"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <img alt="Google Cloud" src="/google.webp" className="w-6 h-6" />
                                            </motion.div>
                                            <div>
                                                <div className="font-semibold text-white text-base">Google Cloud Platform</div>
                                                <div className="text-slate-400 text-sm">Enterprise Solutions Partner</div>
                                            </div>
                                        </div>
                                        <motion.div
                                            className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <Shield className="w-3 h-3" />
                                            CERTIFIED
                                        </motion.div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        {partnerships[0].apps.map((app, appIndex) => {
                                            const icons = [BarChart3, Database, Cloud, Shield];
                                            const colors = ["text-blue-400", "text-emerald-400", "text-purple-400", "text-orange-400"];
                                            const backgrounds = ["bg-blue-500/20", "bg-emerald-500/20", "bg-purple-500/20", "bg-orange-500/20"];
                                            const Icon = icons[appIndex];

                                            return (
                                                <motion.div
                                                    key={app}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, delay: appIndex * 0.1 }}
                                                    className="flex flex-col items-center space-y-2 cursor-pointer"
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                >
                                                    <div className={`w-10 h-10 ${backgrounds[appIndex]} backdrop-blur-sm rounded-lg flex items-center justify-center border border-slate-600/40`}>
                                                        <Icon className={`w-5 h-5 ${colors[appIndex]}`} />
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-300 text-center">{app}</span>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfessionalHero;
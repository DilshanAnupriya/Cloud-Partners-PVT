"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowRight, Code, Users, Zap, Globe, Play } from 'lucide-react';
import {
    BriefcaseIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    EnvelopeIcon,
    PencilSquareIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

const ZohoHero = () => {
    const { scrollY } = useScroll();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Parallax effect for subtle depth
    const y1 = useTransform(scrollY, [0, 300], [0, 50]);
    const y2 = useTransform(scrollY, [0, 300], [0, -30]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.8,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { scale: 0.8, opacity: 0, rotateX: 15 },
        visible: {
            scale: 1,
            opacity: 1,
            rotateX: 0,
            transition: {
                duration: 1,
                ease: 'easeOut',
            },
        },
    };

    const features = [
        { icon: Code, text: 'Advanced Development' },
        { icon: Users, text: 'Team Collaboration' },
        { icon: Zap, text: 'Lightning Fast' },
        { icon: Globe, text: 'Global Scale' },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
            {/* Mouse follower gradient */}
            <motion.div
                className="absolute w-48 h-48 bg-gradient-to-br from-[#0974B0]/30 to-[#219E4A]/20 rounded-full blur-3xl pointer-events-none"
                animate={{
                    x: mousePosition.x - 96,
                    y: mousePosition.y - 96,
                }}
                transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 100,
                }}
            />

            <motion.div
                className="relative z-10 container mx-auto px-6 pt-10 pb-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Hero Content */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-36">
                    {/* Left Side - Text Content */}
                    <motion.div className="lg:w-1/2" variants={itemVariants}>
                        <motion.div
                            className="inline-flex items-center px-4 py-2 bg-[#0974B0]/20 rounded-full mb-6 border border-[#0974B0]/30 text-[#4FB3D9] text-sm font-medium backdrop-blur-sm"
                            whileHover={{ scale: 1.05, backgroundColor: '#0974B0', color: '#fff' }}
                            transition={{ duration: 0.3 }}
                        >
                            <Zap className="w-4 h-4 mr-2" />
                            <span>Transforming Business Innovation</span>
                        </motion.div>

                        <motion.h1
                            className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
                            variants={itemVariants}
                        >
                            Empower Your
                            <br />
                            <span className="bg-gradient-to-r from-[#0974B0] to-[#219E4A] bg-clip-text text-transparent">
                                Business
                            </span>
                            <br />
                            with Zoho
                        </motion.h1>

                        <motion.p
                            className="text-lg text-gray-300 mb-8 max-w-md leading-relaxed"
                            variants={itemVariants}
                        >
                            Discover cutting-edge tools and enterprise solutions designed to scale your business and drive innovation in the digital era.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
                            variants={itemVariants}
                        >
                            <motion.button
                                className="bg-[#0974B0] text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center group hover:bg-[#08669A] transition-all duration-300 border border-[#0974B0]/20"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 15px 30px rgba(9, 116, 176, 0.4)',
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Start Now
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            <motion.button
                                className="border border-[#0974B0]/50 text-[#4FB3D9] px-8 py-4 rounded-lg font-semibold flex items-center justify-center group hover:bg-[#0974B0]/10 hover:border-[#0974B0] transition-all duration-300 backdrop-blur-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Play className="mr-2 w-5 h-5" />
                                Watch Demo
                            </motion.button>
                        </motion.div>

                        {/* Feature Icons */}
                        <motion.div
                            className="flex flex-wrap gap-6"
                            variants={itemVariants}
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center space-x-2 text-gray-300"
                                    whileHover={{ scale: 1.05, color: '#4FB3D9' }}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 + 0.8 }}
                                >
                                    <feature.icon className="w-5 h-5 text-[#219E4A]" />
                                    <span className="text-sm font-medium">{feature.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Visual Elements */}
                    <motion.div
                        className="lg:w-1/2 relative"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ y: y1 }}
                    >
                        {/* Main Dashboard Card */}
                        <motion.div
                            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-3xl p-8 shadow-2xl backdrop-blur-lg relative overflow-hidden"
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
                            }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0974B0]/10 to-[#219E4A]/10 rounded-3xl" />

                            <div className="relative z-10">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Zoho Workspace</h3>
                                        <p className="text-gray-400 text-sm">Unified business solutions at your fingertips</p>
                                    </div>
                                    <div className="w-26 h-20 rounded-xl flex items-center justify-center">
                                        <img
                                            alt="zoho logo"
                                            className=""
                                            src="/zohologo.png"
                                        />
                                    </div>
                                </div>

                                {/* App Grid */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {[
                                        { name: 'CRM', icon: <UserGroupIcon className="w-6 h-6 text-gray-300" />, delay: 0.2 },
                                        { name: 'Mail', icon: <EnvelopeIcon className="w-6 h-6 text-gray-300" />, delay: 0.3 },
                                        { name: 'Books', icon: <CurrencyDollarIcon className="w-6 h-6 text-gray-300" />, delay: 0.4 },
                                        { name: 'Projects', icon: <BriefcaseIcon className="w-6 h-6 text-gray-300" />, delay: 0.5 },
                                        { name: 'Analytics', icon: <ChartBarIcon className="w-6 h-6 text-gray-300" />, delay: 0.6 },
                                        { name: 'Creator', icon: <PencilSquareIcon className="w-6 h-6 text-gray-300" />, delay: 0.7 },
                                    ].map((app, index) => (
                                        <motion.div
                                            key={app.name}
                                            className="bg-gray-800/60 rounded-xl p-4 text-center cursor-pointer relative overflow-hidden border border-gray-700"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: app.delay, duration: 0.5 }}
                                            whileHover={{
                                                scale: 1.05,
                                                rotateY: 5,
                                                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <motion.div
                                                className="absolute inset-0 bg-white/10 rounded-xl"
                                                initial={{ x: '-100%' }}
                                                whileHover={{ x: '100%' }}
                                                transition={{ duration: 0.6 }}
                                            />
                                            <div className="relative z-10">
                                                <div className="mb-2">
                                                    {app.icon}
                                                </div>
                                                <div className="text-white font-semibold text-sm mb-1">{app.name}</div>
                                                <div className="text-gray-400 text-xs">Active</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Stats Bar */}
                                <motion.div
                                    className="bg-gray-900/60 rounded-2xl p-6 border border-gray-700/30"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-white font-medium">Business Performance</span>
                                        <span className="text-[#219E4A] text-sm font-semibold">+12% this month</span>
                                    </div>

                                    {/* Animated Progress Bars */}
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Revenue', value: 85, color: '#0974B0' },
                                            { label: 'Leads', value: 72, color: '#219E4A' },
                                            { label: 'Productivity', value: 94, color: '#F59E0B' },
                                        ].map((metric, index) => (
                                            <div key={metric.label}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-300">{metric.label}</span>
                                                    <span className="text-white font-medium">{metric.value}%</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-2">
                                                    <motion.div
                                                        className="h-2 rounded-full"
                                                        style={{ backgroundColor: metric.color }}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${metric.value}%` }}
                                                        transition={{ delay: 1 + index * 0.1, duration: 1, ease: 'easeOut' }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Orbiting Elements */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#0974B0] rounded-full"
                            animate={{
                                rotate: 360,
                                x: [0, 60, 0, -60, 0],
                                y: [0, -40, 0, 40, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                            style={{ transformOrigin: 'center' }}
                        />

                        <motion.div
                            className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#219E4A] rounded-full"
                            animate={{
                                rotate: -360,
                                x: [0, -40, 0, 40, 0],
                                y: [0, 30, 0, -30, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                            style={{ transformOrigin: 'center' }}
                        />
                    </motion.div>
                </div>

                {/* Bottom Stats */}
                <motion.div
                    className="mt-36 grid grid-cols-2 md:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {[
                        { number: '50M+', label: 'Users Worldwide' },
                        { number: '180+', label: 'Countries' },
                        { number: '99.9%', label: 'Uptime' },
                        { number: '24/7', label: 'Support' },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center border border-gray-700/30 rounded-2xl"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-3xl font-bold text-white mb-2 pt-10">{stat.number}</div>
                            <div className="text-gray-400 text-sm font-medium pb-10">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ZohoHero;
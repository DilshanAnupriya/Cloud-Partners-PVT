"use client"
import React, { useEffect, useRef } from 'react';
import { Coffee, TrendingUp, Award, Users, Zap, Briefcase } from 'lucide-react';

// Type augmentation for Zoho Recruit embed script
type RecEmbedJS = {
    load: (options: {
        widget_id: string;
        page_name?: string;
        source?: string;
        site?: string;
        brand_color?: string;
        empty_job_msg?: string;
    }) => void;
};

declare global {
    interface Window {
        rec_embed_js?: RecEmbedJS;
    }
}

const CareerPage = () => {
    const heroRef = useRef<HTMLElement>(null);
    const jobsRef = useRef<HTMLElement>(null);
    const benefitsRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Load Zoho Recruit CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://static.zohocdn.com/recruit/embed_careers_site/css/v1.1/embed_jobs.css';
        link.type = 'text/css';
        document.head.appendChild(link);

        // Load Zoho Recruit JavaScript
        const script = document.createElement('script');
        script.src = 'https://static.zohocdn.com/recruit/embed_careers_site/javascript/v1.1/embed_jobs.js';
        script.type = 'text/javascript';
        script.async = true;

        script.onload = () => {
            // Initialize Zoho Recruit widget after script loads
            window.rec_embed_js?.load({
                widget_id: "rec_job_listing_div",
                page_name: "Careers",
                source: "CareerSite",
                site: "https://careers.cloudpartners.biz",
                brand_color: "#6875E2",
                empty_job_msg: "No current Openings"
            });
        };

        document.body.appendChild(script);

        // Animate on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    el.classList.add('animated');
                }
            });
        };

        // Hero animation
        if (heroRef.current) {
            setTimeout(() => {
                heroRef.current?.classList.add('hero-animated');
            }, 100);
        }

        // Stats counter animation
        const animateStats = () => {
            const statsElements = document.querySelectorAll('.stat-number') as NodeListOf<HTMLElement>;
            statsElements.forEach(stat => {
                const target = parseInt(stat.dataset.target || '0');
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current).toString();
                }, 30);
            });
        };

        window.addEventListener('scroll', animateOnScroll);
        setTimeout(animateStats, 1000);

        return () => {
            window.removeEventListener('scroll', animateOnScroll);
            // Cleanup scripts
            document.head.removeChild(link);
            document.body.removeChild(script);
        };
    }, []);

    const benefits = [
        { icon: <Coffee className="w-6 h-6" />, title: "Flexible Work", desc: "Work from anywhere with flexible hours" },
        { icon: <TrendingUp className="w-6 h-6" />, title: "Growth Opportunities", desc: "Continuous learning and career advancement" },
        { icon: <Award className="w-6 h-6" />, title: "Competitive Benefits", desc: "Health, dental, vision, and retirement plans" },
        { icon: <Users className="w-6 h-6" />, title: "Amazing Team", desc: "Work with talented and passionate people" },
        { icon: <Zap className="w-6 h-6" />, title: "Cutting-edge Tech", desc: "Use the latest tools and technologies" },
        { icon: <Briefcase className="w-6 h-6" />, title: "Work-Life Balance", desc: "Unlimited PTO and wellness programs" }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="hero-section relative h-screen flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="text-center text-white z-10 max-w-4xl mx-auto px-4">
                    <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 opacity-0 transform translate-y-8">
                        Join Our Team
                    </h1>
                    <p className="hero-subtitle text-xl md:text-2xl mb-8 opacity-0 transform translate-y-8">
                        Build the future with innovative minds and cutting-edge technology
                    </p>
                    <button
                        onClick={() => jobsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        className="hero-cta bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 opacity-0 translate-y-8"
                    >
                        Explore Opportunities
                    </button>
                </div>
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div className="animate-on-scroll opacity-0 transform translate-y-4">
                            <div className="stat-number text-4xl font-bold text-blue-600 mb-2" data-target="10">0</div>
                            <p className="text-gray-600">Team Members</p>
                        </div>
                        <div className="animate-on-scroll opacity-0 transform translate-y-4">
                            <div className="stat-number text-4xl font-bold text-purple-600 mb-2" data-target="2">0</div>
                            <p className="text-gray-600">Countries</p>
                        </div>
                        <div className="animate-on-scroll opacity-0 transform translate-y-4">
                            <div className="stat-number text-4xl font-bold text-green-600 mb-2" data-target="95">0</div>
                            <p className="text-gray-600">% Satisfaction</p>
                        </div>
                        <div className="animate-on-scroll opacity-0 transform translate-y-4">
                            <div className="stat-number text-4xl font-bold text-orange-600 mb-2" data-target="4">0</div>
                            <p className="text-gray-600">Open Positions</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Openings Section with Zoho Recruit */}
            <section ref={jobsRef} className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-on-scroll opacity-0 transform translate-y-4">
                            Open Positions
                        </h2>
                        <p className="text-xl text-gray-600 animate-on-scroll opacity-0 transform translate-y-4">
                            Find your next career opportunity with us
                        </p>
                    </div>

                    {/* Zoho Recruit Embedded Widget */}
                    <div className="zoho-recruit-container animate-on-scroll opacity-0 transform translate-y-4">
                        <div className="embed_jobs_head embed_jobs_with_style_3">
                            <div className="embed_jobs_head2">
                                <div className="embed_jobs_head3">
                                    <div id="rec_job_listing_div"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section ref={benefitsRef} className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-on-scroll opacity-0 transform translate-y-4">
                            Why Join Us?
                        </h2>
                        <p className="text-xl text-gray-600 animate-on-scroll opacity-0 transform translate-y-4">
                            We offer more than just a job - we offer a career and a community
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="benefit-card text-center p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105 animate-on-scroll opacity-0 translate-y-4"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full mb-6">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section relative py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white overflow-hidden mb-20 mx-5 2xl:mx-30 rounded-2xl">
                <div className="grid-background absolute inset-0 opacity-20">
                    <div className="grid-container">
                        {Array.from({ length: 100 }).map((_, i) => (
                            <div key={i} className="grid-item"></div>
                        ))}
                    </div>
                </div>

                <div className="grid-lines absolute inset-0 opacity-10">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={`v-${i}`}
                            className="grid-line-vertical"
                            style={{ left: `${(i * 5)}%` }}
                        ></div>
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={`h-${i}`}
                            className="grid-line-horizontal"
                            style={{ top: `${(i * 10)}%` }}
                        ></div>
                    ))}
                </div>

                <div className="grid-dots absolute inset-0 opacity-30">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div
                            key={i}
                            className="grid-dot"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        ></div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <h2 className="text-4xl font-bold mb-6 animate-on-scroll opacity-0 transform translate-y-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl mb-8 animate-on-scroll opacity-0 transform translate-y-4">
                        Don&apos;t see the perfect role? Send us your resume and we&apos;ll keep you in mind for future opportunities.
                    </p>
                    <div className="space-x-4 animate-on-scroll opacity-0 transform translate-y-4">
                        <a
                            href="https://careers.cloudpartners.biz/forms/64407761193b29ebae1189d8165c6e0244c2cd5c6d734dfd9db6d9213d377230"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Submit Resume
                        </a>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                            Contact HR
                        </button>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .hero-section.hero-animated .hero-title {
                    opacity: 1;
                    transform: translateY(0);
                    transition: all 1s ease-out 0.2s;
                }

                .hero-section.hero-animated .hero-subtitle {
                    opacity: 1;
                    transform: translateY(0);
                    transition: all 1s ease-out 0.4s;
                }

                .hero-section.hero-animated .hero-cta {
                    opacity: 1;
                    transform: translateY(0);
                    transition: all 1s ease-out 0.6s;
                }

                .animate-on-scroll.animated {
                    opacity: 1;
                    transform: translateY(0);
                    transition: all 0.6s ease-out;
                }

                .benefit-card:hover {
                    transform: translateY(-8px) scale(1.02);
                }

                /* Zoho Recruit Container Styling */
                .zoho-recruit-container {
                    min-height: 300px;
                }

                /* Grid Background Effects */
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(20, 1fr);
                    grid-template-rows: repeat(5, 1fr);
                    width: 100%;
                    height: 100%;
                    gap: 1px;
                }

                .grid-item {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    animation: gridPulse 4s ease-in-out infinite;
                }

                .grid-item:nth-child(odd) {
                    animation-delay: 0.5s;
                }

                .grid-item:nth-child(3n) {
                    animation-delay: 1s;
                }

                .grid-item:nth-child(5n) {
                    animation-delay: 1.5s;
                }

                .grid-line-vertical {
                    position: absolute;
                    top: 0;
                    width: 1px;
                    height: 100%;
                    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent);
                    animation: lineGlow 3s ease-in-out infinite alternate;
                }

                .grid-line-horizontal {
                    position: absolute;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
                    animation: lineGlow 3s ease-in-out infinite alternate;
                }

                .grid-line-vertical:nth-child(odd) {
                    animation-delay: 1s;
                }

                .grid-line-horizontal:nth-child(even) {
                    animation-delay: 2s;
                }

                .grid-dot {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    animation: dotMove 8s linear infinite, dotPulse 2s ease-in-out infinite;
                }

                @keyframes gridPulse {
                    0%, 100% {
                        background: rgba(255, 255, 255, 0.05);
                        border-color: rgba(255, 255, 255, 0.1);
                    }
                    50% {
                        background: rgba(255, 255, 255, 0.15);
                        border-color: rgba(255, 255, 255, 0.3);
                    }
                }

                @keyframes lineGlow {
                    0% { opacity: 0.1; }
                    100% { opacity: 0.6; }
                }

                @keyframes dotMove {
                    0% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(20px, -30px) scale(1.2);
                    }
                    50% {
                        transform: translate(-10px, -60px) scale(0.8);
                    }
                    75% {
                        transform: translate(-30px, -20px) scale(1.1);
                    }
                    100% {
                        transform: translate(0, 0) scale(1);
                    }
                }

                @keyframes dotPulse {
                    0%, 100% {
                        opacity: 0.3;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.5);
                    }
                }

                .cta-section button,
                .cta-section a {
                    position: relative;
                    overflow: hidden;
                }

                .cta-section button:before,
                .cta-section a:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s;
                }

                .cta-section button:hover:before,
                .cta-section a:hover:before {
                    left: 100%;
                }

                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 3rem;
                    }
                    .hero-subtitle {
                        font-size: 1.125rem;
                    }

                    .grid-container {
                        grid-template-columns: repeat(10, 1fr);
                    }

                    .grid-dot {
                        width: 3px;
                        height: 3px;
                    }
                }
            `}</style>
        </div>
    );
};

export default CareerPage;
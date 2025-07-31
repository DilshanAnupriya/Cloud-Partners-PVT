"use client"
import React, { useEffect, useState } from 'react';

const CustomerLogos = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Dummy logo data - replace with actual company logos
    const logos = [
        { id: 1, name: 'TechCorp', color: '#3B82F6' },
        { id: 2, name: 'InnovateLab', color: '#10B981' },
        { id: 3, name: 'FutureWorks', color: '#F59E0B' },
        { id: 4, name: 'DataFlow', color: '#EF4444' },
        { id: 5, name: 'CloudTech', color: '#8B5CF6' },
        { id: 6, name: 'NextGen', color: '#06B6D4' },
        { id: 7, name: 'PixelPro', color: '#EC4899' },
        { id: 8, name: 'CodeCraft', color: '#84CC16' },
    ];

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-50 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`text-center mb-16 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <div className="inline-block">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-2 block animate-pulse">
              Trusted by Industry Leaders
            </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Powering Success for
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Innovators</span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join thousands of companies that trust us to deliver exceptional results and drive their digital transformation forward.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                    {logos.map((logo, index) => (
                        <div
                            key={logo.id}
                            className={`group relative transition-all duration-1000 ease-out ${
                                isVisible
                                    ? 'opacity-100 translate-y-0 scale-100'
                                    : 'opacity-0 translate-y-8 scale-95'
                            }`}
                            style={{
                                transitionDelay: `${index * 100}ms`,
                            }}
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-gray-200 transform hover:-translate-y-2 hover:scale-105">
                                {/* Animated background gradient */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(135deg, ${logo.color}22, ${logo.color}44)`,
                                    }}
                                />

                                {/* Logo placeholder */}
                                <div className="relative z-10 flex items-center justify-center h-16">
                                    <div
                                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 group-hover:rotate-6 group-hover:scale-110"
                                        style={{ backgroundColor: logo.color }}
                                    >
                                        {logo.name.charAt(0)}
                                    </div>

                                    <span className="ml-3 font-semibold text-gray-800 text-lg transition-all duration-300 group-hover:translate-x-1">
                    {logo.name}
                  </span>
                                </div>

                                {/* Hover effect overlay */}
                                <div
                                    className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-opacity-20 transition-all duration-500"
                                    style={{ borderColor: logo.color }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA section */}
                <div
                    className={`text-center mt-16 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: '800ms' }}
                >
                    <div className="inline-block transform transition-all duration-300 hover:scale-105 active:scale-95">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:from-blue-700 hover:to-purple-700">
                            Join Our Success Stories
                        </button>
                    </div>

                    <p className="text-gray-600 mt-4 transition-opacity duration-700 delay-1000">
                        Ready to be our next success story? Let's get started today.
                    </p>
                </div>
            </div>

            {/* Floating elements for visual interest */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float" />
            <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-float-reverse" />

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
};

export default CustomerLogos;
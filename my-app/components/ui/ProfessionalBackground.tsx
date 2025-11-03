"use client";
import React from "react";

const ProfessionalBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora Gradient Layers */}
      <div className="absolute inset-0">
        {/* Primary Aurora */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-purple-300/15 to-transparent rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '8s' }} />
        
        {/* Secondary Aurora */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-bl from-emerald-300/15 via-blue-200/10 to-transparent rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '12s', animationDelay: '2s' }} />
        
        {/* Tertiary Aurora */}
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-tr from-purple-200/10 via-pink-200/8 to-transparent rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '10s', animationDelay: '4s' }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="w-full h-full" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }} />
      </div>

      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full">
        <div className="w-full h-full bg-gradient-radial from-white/5 via-transparent to-transparent" />
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
        <div className="w-full h-full" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             }} />
      </div>
    </div>
  );
};

export default ProfessionalBackground;
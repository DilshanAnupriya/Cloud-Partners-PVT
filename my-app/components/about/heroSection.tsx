"use client";

import React from "react";

function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with office/IT theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
        {/* Office/IT Background Image */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600"><rect fill="%23111827" width="1000" height="600"/><g opacity="0.3"><rect x="50" y="50" width="200" height="120" fill="%233B82F6" rx="8"/><rect x="280" y="50" width="160" height="120" fill="%236366F1" rx="8"/><rect x="470" y="50" width="180" height="120" fill="%238B5CF6" rx="8"/><rect x="680" y="50" width="150" height="120" fill="%23EC4899" rx="8"/><circle cx="150" cy="250" r="40" fill="%2310B981"/><circle cx="350" cy="250" r="35" fill="%23F59E0B"/><circle cx="550" cy="250" r="45" fill="%23EF4444"/><circle cx="750" cy="250" r="38" fill="%236366F1"/><path d="M100,350 Q200,300 300,350 T500,350" stroke="%233B82F6" stroke-width="3" fill="none"/><path d="M600,350 Q700,300 800,350 T900,350" stroke="%238B5CF6" stroke-width="3" fill="none"/></g></svg>')`
          }}
        />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-blue-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-purple-500 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-4 h-4 bg-green-500 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-40 w-2 h-2 bg-pink-500 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Spotlight effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-blue-500/15 via-blue-500/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-purple-500/15 via-purple-500/5 to-transparent rounded-full blur-3xl"></div>

      {/* Main Hero Section */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 py-20 min-h-screen flex items-center">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 w-full">
          
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            {/* Subtitle Badge */}
            <div className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-blue-300 text-sm font-medium">Leading IT Solutions Provider</span>
            </div>

            {/* Main Title with Gradient */}
            <div className="relative">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  About Our
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  IT Company
                </span>
              </h1>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white/5 blur-sm pointer-events-none">
                <span className="block">About Our</span>
                <span className="block">IT Company</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed max-w-2xl">
              <p className="text-xl text-gray-200">
                We are a cutting-edge IT solutions provider dedicated to transforming businesses 
                through innovative technology and digital excellence.
              </p>
              <p>
                Our expert team specializes in comprehensive IT services, from software development 
                and system integration to cloud solutions and digital transformation. We empower 
                organizations to thrive in the digital age with scalable, secure, and efficient 
                technology solutions.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/25 text-white">
                <span className="relative z-10 flex items-center">
                  Explore Our Services
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button className="border-2 border-slate-600 hover:border-blue-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-500/10 backdrop-blur-sm text-slate-300 hover:text-white">
                Schedule Consultation
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-slate-700/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">500+</div>
                <div className="text-sm text-gray-400">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">98%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-gray-400">Technical Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">15+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Visual Content */}
          <div className="flex-1 flex justify-center relative">
            <div className="relative group">
              {/* Main office/tech image placeholder */}
              <div className="w-[500px] h-[600px] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-3xl shadow-2xl relative overflow-hidden border border-slate-600/30">
                
                {/* Tech/Office visual elements */}
                <div className="absolute inset-4 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl">
                  
                  {/* Simulated screens/monitors */}
                  <div className="absolute top-8 left-8 w-32 h-20 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg border border-blue-400/30 animate-pulse"></div>
                  <div className="absolute top-8 right-8 w-28 h-18 bg-gradient-to-br from-green-500/30 to-green-600/30 rounded-lg border border-green-400/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-40 left-12 w-36 h-24 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-lg border border-purple-400/30 animate-pulse" style={{ animationDelay: '2s' }}></div>
                  
                  {/* Code-like lines */}
                  <div className="absolute bottom-20 left-8 right-8 space-y-2">
                    <div className="h-2 bg-gradient-to-r from-blue-400/40 to-transparent rounded"></div>
                    <div className="h-2 bg-gradient-to-r from-green-400/40 to-transparent rounded w-3/4"></div>
                    <div className="h-2 bg-gradient-to-r from-purple-400/40 to-transparent rounded w-1/2"></div>
                    <div className="h-2 bg-gradient-to-r from-pink-400/40 to-transparent rounded w-2/3"></div>
                  </div>

                  {/* Floating particles */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
                    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                  </div>
                </div>

                {/* Rim lighting effect */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-blue-500/20 ring-inset group-hover:ring-blue-500/40 transition-all duration-300"></div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-3xl transition-all duration-300"></div>
              </div>

              {/* Floating tech icons */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl animate-float">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                </svg>
              </div>

              <div className="absolute top-1/2 -right-6 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white shadow-xl animate-float" style={{ animationDelay: '2s' }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Content Sections - Below Hero */}
      <div className="relative z-10 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 lg:px-16 py-20 space-y-32">
          
          {/* Our Core Expertise Section */}
          <div className="text-center">
            <div className="mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Core Expertise</span>
              </h2>
              <p className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
                Delivering comprehensive IT solutions with cutting-edge technology and industry best practices that drive digital transformation and business growth
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Cloud Solutions */}
              <div className="group bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-blue-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Cloud Solutions</h3>
                <p className="text-gray-300 leading-relaxed">Scalable cloud infrastructure, seamless migration services, and enterprise-grade hosting solutions</p>
              </div>

              {/* Software Development */}
              <div className="group bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-purple-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Software Development</h3>
                <p className="text-gray-300 leading-relaxed">Custom applications, enterprise software solutions, and modern web development services</p>
              </div>

              {/* Cybersecurity */}
              <div className="group bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-green-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m0 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Cybersecurity</h3>
                <p className="text-gray-300 leading-relaxed">Advanced security solutions, threat protection, and comprehensive security auditing services</p>
              </div>

              {/* Digital Transformation */}
              <div className="group bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-orange-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Digital Transformation</h3>
                <p className="text-gray-300 leading-relaxed">Modern business process automation, workflow optimization, and digital strategy consulting</p>
              </div>
            </div>
          </div>

          {/* Why Choose Cloud Partners Section */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left side - Values */}
            <div className="space-y-8">
              <div className="mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Cloud Partners?</span>
                </h2>
                <p className="text-gray-300 text-xl leading-relaxed">
                  We combine technical excellence with business insight to deliver solutions that truly make a difference
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 mt-2">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">Proven Excellence</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">15+ years of delivering innovative IT solutions with a 98% client satisfaction rate across diverse industries</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 mt-2">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">Innovation Focus</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">Cutting-edge technology solutions and emerging tech adoption that keeps your business ahead of the competition</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 mt-2">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">Expert Team</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">Certified professionals with deep expertise across all major technology platforms and frameworks</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 mt-2">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">24/7 Support</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">Round-the-clock technical support and proactive maintenance to ensure optimal business continuity</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Technology Stack */}
            <div className="relative">
              <div className="w-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-3xl border border-slate-700/40 p-10 backdrop-blur-sm">
                <div className="space-y-8">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold text-white mb-4">Technology Stack</h3>
                    <p className="text-gray-400 text-lg">Cutting-Edge Tools & Platforms We Master</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-blue-500/20 p-4 rounded-2xl text-center border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                      <div className="text-blue-300 font-bold text-lg">AWS</div>
                    </div>
                    <div className="bg-green-500/20 p-4 rounded-2xl text-center border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
                      <div className="text-green-300 font-bold text-lg">Azure</div>
                    </div>
                    <div className="bg-purple-500/20 p-4 rounded-2xl text-center border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                      <div className="text-purple-300 font-bold text-lg">Docker</div>
                    </div>
                    <div className="bg-orange-500/20 p-4 rounded-2xl text-center border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105">
                      <div className="text-orange-300 font-bold text-lg">React</div>
                    </div>
                    <div className="bg-pink-500/20 p-4 rounded-2xl text-center border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
                      <div className="text-pink-300 font-bold text-lg">Node.js</div>
                    </div>
                    <div className="bg-indigo-500/20 p-4 rounded-2xl text-center border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 hover:scale-105">
                      <div className="text-indigo-300 font-bold text-lg">Python</div>
                    </div>
                    <div className="bg-teal-500/20 p-4 rounded-2xl text-center border border-teal-500/30 hover:border-teal-400/50 transition-all duration-300 hover:scale-105">
                      <div className="text-teal-300 font-bold text-lg">MongoDB</div>
                    </div>
                    <div className="bg-red-500/20 p-4 rounded-2xl text-center border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105">
                      <div className="text-red-300 font-bold text-lg">Redis</div>
                    </div>
                    <div className="bg-yellow-500/20 p-4 rounded-2xl text-center border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
                      <div className="text-yellow-300 font-bold text-lg">K8s</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Floating certification badges */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float border-4 border-blue-400/20">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-18 h-18 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float border-4 border-green-400/20" style={{ animationDelay: '1s' }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Final Call to Action Section */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl p-16 border border-blue-500/30 backdrop-blur-sm relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-gray-300 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                  Let's discuss how our comprehensive IT solutions can drive your business forward and unlock new opportunities for growth. Schedule a free consultation with our experts today.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl text-white relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center">
                      Start Your Project
                      <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/20 group-hover:to-purple-400/20 transition-all duration-300"></div>
                  </button>
                  <button className="border-2 border-slate-600 hover:border-blue-500 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-blue-500/10 backdrop-blur-sm text-slate-300 hover:text-white hover:shadow-xl">
                    View Our Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
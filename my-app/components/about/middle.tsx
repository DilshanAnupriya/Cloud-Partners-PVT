"use client";
import React, { useState, useEffect } from 'react';

function ModernTimeline() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [activeYear, setActiveYear] = useState('2017');

  const timelineData = [
    {
      year: '2017',
      title: 'Foundation & Vision',
      description: 'Strategic planning to revolutionize business automation through cutting-edge IT solutions',
      icon: '🎯',
      highlight: 'Strategic Planning',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      year: '2018',
      title: 'Freelance Excellence',
      description: 'Launched specialized Zoho & Google Workspace automation services for growing businesses',
      icon: '🚀',
      highlight: 'First Clients Served',
      color: 'from-purple-500 to-pink-500'
    },
    {
      year: '2019',
      title: 'Official Business Entity',
      description: 'Registered as a professional organization specializing in business process automation',
      icon: '🏢',
      highlight: 'Legal Registration',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      year: '2020',
      title: 'Expert Team Assembly',
      description: 'Built a powerhouse team of Zoho & Google certified professionals to scale operations',
      icon: '👥',
      highlight: 'Team Expansion',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const achievements = [
    { number: '500+', label: 'Businesses Automated' },
    { number: '50+', label: 'Zoho Apps Integrated' },
    { number: '99.9%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const index = element.dataset.index;
            if (index) {
              setVisibleItems(prev => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineItems = document.querySelectorAll('[data-timeline-item]');
    timelineItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({ number, delay = 0 }: { number: string; delay?: number }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (!hasAnimated && visibleItems.size > 0) {
        setHasAnimated(true);
        const target = parseInt(number.replace(/[^0-9]/g, '')) || 100;
        const duration = 2000;
        const steps = 60;
        const stepValue = target / steps;
        
        setTimeout(() => {
          let current = 0;
          const timer = setInterval(() => {
            current += stepValue;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }, delay);
      }
    }, [visibleItems, number, delay, hasAnimated]);

    const displayNumber = number.includes('%') ? `${count}%` : 
                         number.includes('+') ? `${count}+` : 
                         number.includes('/') ? number : count.toString();

    return displayNumber;
  };

  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-white/20 rounded-full`}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
            transform: `translateY(${Math.sin(scrollY * 0.001 + i) * 20}px)`,
            animationDelay: `${i * 0.5}s`,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slideInUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.5); }
          50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.8), 0 0 30px rgba(99, 102, 241, 0.6); }
        }
      `}</style>

      {/* Enhanced Header Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-32 px-6 overflow-hidden">
        <FloatingElements />
        
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full text-sm font-semibold mb-12 shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer group">
            <span className="mr-3 text-xl group-hover:animate-bounce">🏆</span>
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Trusted Business Automation Partner Since 2018
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-8 animate-slideInUp">
            Transforming Businesses With{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Zoho & Google
            </span>
            <br />
            <span className="text-5xl md:text-7xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Automation Excellence
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed animate-slideInUp" style={{animationDelay: '0.3s'}}>
            We specialize in creating intelligent business operating systems using Zoho and Google Workspace, 
            helping companies streamline operations, boost productivity, and accelerate growth through 
            cutting-edge IT automation solutions.
          </p>

          {/* Enhanced Achievement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {achievements.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group cursor-pointer hover:scale-110 transition-all duration-500"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:bg-white/20">
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3 group-hover:animate-pulse">
                    <AnimatedCounter number={stat.number} delay={index * 200} />
                  </div>
                  <div className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Timeline Section */}
      <div className="py-32 px-6 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-full text-sm font-bold mb-6 uppercase tracking-wider hover:scale-105 transition-all duration-300">
              Our Story
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Our Journey to{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From humble beginnings to becoming a leading business automation partner, 
              here's how we've grown to serve hundreds of businesses worldwide.
            </p>
          </div>

          <div className="relative">
            {/* Ultra-Enhanced Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-3 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 transform -translate-y-1/2 rounded-full"></div>
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 transform -translate-y-1/2 rounded-full shadow-xl animate-pulse"></div>
            
            {/* Timeline Items */}
            <div className="relative flex flex-col lg:flex-row justify-between items-start space-y-32 lg:space-y-0 lg:space-x-8">
              {timelineData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center group flex-1 cursor-pointer"
                  data-timeline-item
                  data-index={index}
                  onMouseEnter={() => setActiveYear(item.year)}
                  style={{
                    animation: visibleItems.has(index.toString()) ? 
                      `slideIn${index % 2 === 0 ? 'Left' : 'Right'} 0.8s ease-out ${index * 0.2}s both` : 'none'
                  }}
                >
                  {/* Ultra-Enhanced Year Circle */}
                  <div className="relative z-20 mb-12">
                    <div className={`w-36 h-36 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:scale-125 group-hover:rotate-6 ${activeYear === item.year ? 'animate-glow scale-110' : ''}`}>
                      <div className="text-4xl group-hover:animate-bounce">{item.icon}</div>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-2xl border-2 border-gray-100 group-hover:scale-110 transition-all duration-500">
                      <span className="text-2xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{item.year}</span>
                    </div>
                    
                    {/* Glowing ring effect */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-20 scale-150 animate-pulse ${activeYear === item.year ? 'opacity-40' : ''}`}></div>
                  </div>
                  
                  {/* Ultra-Enhanced Content Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-100 max-w-sm transition-all duration-700 hover:shadow-3xl hover:-translate-y-6 hover:bg-white group-hover:border-purple-200 hover:scale-105">
                    <div className={`inline-block bg-gradient-to-r ${item.color} bg-opacity-10 text-transparent bg-clip-text px-5 py-3 rounded-full text-xs font-bold mb-6 uppercase tracking-wider border border-current border-opacity-20`}>
                      <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                        {item.highlight}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-black mb-6 leading-tight group-hover:text-purple-600 transition-colors duration-500">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-500">
                      {item.description}
                    </p>
                    
                    {/* Hover effect indicator */}
                    <div className="mt-6 w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Trust Section */}
      <div className="py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h3 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Why Businesses Choose Us for Their Digital Transformation
          </h3>
          <p className="text-xl text-blue-100 mb-16 max-w-4xl mx-auto leading-relaxed">
            We don't just implement software – we architect complete business operating systems 
            that grow with your company, ensuring every process is optimized for maximum efficiency.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Lightning-Fast Implementation', desc: 'Get your business automated in weeks, not months' },
              { icon: '🎯', title: 'Tailored Solutions', desc: 'Custom automation perfectly fitted to your workflow' },
              { icon: '🛡️', title: 'Ongoing Support', desc: '24/7 expert support to keep your business running' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 transition-all duration-700 hover:bg-white/10 hover:border-white/30 hover:scale-105 hover:-translate-y-2 cursor-pointer"
                style={{
                  animation: `slideInUp 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                <div className="text-5xl mb-6 group-hover:animate-bounce group-hover:scale-125 transition-all duration-500">{feature.icon}</div>
                <h4 className="text-2xl font-bold mb-4 group-hover:text-cyan-300 transition-colors duration-500">{feature.title}</h4>
                <p className="text-blue-100 leading-relaxed group-hover:text-white transition-colors duration-500">{feature.desc}</p>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-700 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModernTimeline;
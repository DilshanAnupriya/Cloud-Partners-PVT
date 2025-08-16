"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, Users, Clock, CheckCircle, Zap, Target } from 'lucide-react';

function IncidentResolutions() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());

  const stats = [
    {
      number: '3',
      suffix: '+',
      label: 'Years of Excellence',
      icon: <Shield className="w-8 h-8" />,
      color: 'bg-blue-600'
    },
    {
      number: '160',
      suffix: '+',
      label: 'Issues Resolved',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'bg-green-600'
    },
    {
      number: '15',
      suffix: '+',
      label: 'Expert Team Members',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-purple-600'
    },
    {
      number: '150',
      suffix: '+',
      label: 'Happy Clients',
      icon: <Clock className="w-8 h-8" />,
      color: 'bg-orange-600'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Rapid Response",
      description: "24/7 immediate incident response with expert resolution"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Precise Solutions",
      description: "Targeted fixes that address root causes, not just symptoms"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Proactive Prevention",
      description: "Advanced monitoring to prevent incidents before they occur"
    }
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
            const id = element.dataset.animateId;
            if (id) {
              setVisibleElements(prev => new Set([...prev, id]));
              observer.unobserve(element); // Mimics 'once' behavior
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('[data-animate-id]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({ targetNumber, suffix, isVisible, delay = 0 }: { 
    targetNumber: string; 
    suffix: string; 
    isVisible: boolean; 
    delay?: number 
  }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (isVisible && !hasAnimated) {
        setHasAnimated(true);
        const target = parseInt(targetNumber);
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
    }, [isVisible, targetNumber, hasAnimated, delay]);

    return `${count}${suffix}`;
  };

  return (
    <main className="bg-gray-50 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-30"></div>

      <section className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div 
            className="space-y-8"
            data-animate-id="main-content"
            style={{ animation: visibleElements.has('main-content') ? 'fadeInLeft 0.6s ease-out both' : 'none' }}
          >
            <div className="inline-flex items-center bg-blue-100/50 border border-blue-200/50 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 transition-all duration-300">
              <Shield className="w-4 h-4 mr-2" />
              Professional IT Solutions
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-snug">
              Incident{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Resolutions
              </span>
              <span className="text-3xl sm:text-4xl block mt-2 text-gray-900">
                Excellence
              </span>
            </h1>
            
            <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
              Provide users with an appropriate view and access permissions to requests, problems, changes, contracts, assets, solutions, and reports with our experienced professionals.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 group"
                  style={{ animation: visibleElements.has('main-content') ? `fadeInLeft 0.6s ease-out ${0.2 + index * 0.1}s both` : 'none' }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              aria-label="Explore more about our incident resolution services"
              className="group inline-flex items-center gap-4 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300 focus:outline-2 focus:outline-blue-600 focus:outline-offset-2"
            >
              <span>Explore More</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true" />
            </button>
          </div>

          <div 
            className="relative"
            data-animate-id="image-section"
            style={{ animation: visibleElements.has('image-section') ? 'fadeInRight 0.6s ease-out 0.2s both' : 'none' }}
          >
            <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                srcSet="
                  https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80 800w,
                  https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80 1200w,
                  https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80 2070w
                "
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="Professional working on laptop with coffee and devices on wooden table"
                className="w-full h-80 sm:h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
          data-animate-id="stats-section"
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center"
              style={{ animation: visibleElements.has('stats-section') ? `fadeInUp 0.6s ease-out ${index * 0.15}s both` : 'none' }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className={`inline-flex p-4 rounded-xl ${stat.color} mb-4`}>
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter 
                    targetNumber={stat.number} 
                    suffix={stat.suffix}
                    isVisible={visibleElements.has('stats-section')}
                    delay={index * 200}
                  />
                </div>
                <div className="text-gray-700 font-semibold text-lg">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div 
          className="text-center"
          data-animate-id="cta-section"
          style={{ animation: visibleElements.has('cta-section') ? 'fadeInUp 0.6s ease-out both' : 'none' }}
        >
          <div className="bg-blue-900 rounded-2xl p-12 shadow-lg border border-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to resolve your{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                IT challenges?
              </span>
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
              Get in touch with our expert team and experience professional incident resolution services 
              that transform your business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button 
                aria-label="Contact our team for incident resolution services"
                className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300 focus:outline-2 focus:outline-blue-600 focus:outline-offset-2"
              >
                Contact Us Today
              </button>
              <button 
                aria-label="Learn more about our services"
                className="border-2 border-blue-400/50 text-blue-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-400/10 hover:border-blue-400 transition-all duration-300 focus:outline-2 focus:outline-blue-600 focus:outline-offset-2"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default IncidentResolutions;
"use client"
import React from 'react';

function TeamHero() {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Head of Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Lisa Park",
      position: "Marketing Director",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "James Wilson",
      position: "Product Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 7,
      name: "Anna Kowalski",
      position: "Operations Manager",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face"
    }
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section with Background Image */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
              }}
          />

          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/50 to-purple-900/60"></div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto text-center text-white px-4 py-20">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium rounded-full">
                Meet Our Team
              </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Our <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Expertise</span> Team
              </h1>

              <p className="text-xl md:text-2xl font-medium mb-12 max-w-3xl mx-auto text-gray-200 leading-relaxed">
                Specialized Team Of Industry Experts Driving Innovation & Excellence
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">50+</div>
                  <div className="text-gray-300">Team Members</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">10+</div>
                  <div className="text-gray-300">Years Experience</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">100+</div>
                  <div className="text-gray-300">Projects Delivered</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25">
                  Join Our Team
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 shadow-xl">
                  View Open Positions
                </button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Leadership & Expertise Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Meet the talented individuals who drive our company's vision and success
              </p>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                  <div
                      key={member.id}
                      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                      style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-600/0 group-hover:from-blue-500/10 group-hover:to-purple-600/10 transition-all duration-500 z-10"></div>

                    {/* Image container */}
                    <div className="relative overflow-hidden">
                      <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 transform rotate-45 translate-x-8 -translate-y-8 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-20 p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">
                        {member.position}
                      </p>

                      {/* Animated underline */}
                      <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto group-hover:w-full transition-all duration-500"></div>
                    </div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000"></div>
                  </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-20">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <span className="font-semibold">Ready to work with us?</span>
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
      </div>
  );
}

export default TeamHero;
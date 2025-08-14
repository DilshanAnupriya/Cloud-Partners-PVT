import React from 'react';
import { ArrowRight, Shield, Users, Clock, CheckCircle } from 'lucide-react';
import Link from "next/link";

function IncidentResolutions() {
  const stats = [
    {
      number: '3',
      suffix: '+',
      label: 'Years of Excellence',
      icon: <Shield className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      number: '160',
      suffix: '+',
      label: 'Issues Resolved',
      icon: <CheckCircle className="w-8 h-8" />,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      number: '15',
      suffix: '+',
      label: 'Expert Team Members',
      icon: <Users className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      number: '150',
      suffix: '+',
      label: 'Happy Clients',
      icon: <Clock className="w-8 h-8" />,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="bg-white py-20 px-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-6 py-2 rounded-full text-sm font-semibold">
              Professional IT Solutions
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Incident{' '}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Resolutions!!
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Provide users with an appropriate view and access permissions to requests, problems, changes, contracts, assets, solutions, and reports with our experienced professionals.
            </p>
            
            <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Explore More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Right Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Professional working on laptop with coffee and devices on wooden table"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group text-center">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                
                {/* Number */}
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.number}<span className="text-3xl">{stat.suffix}</span>
                </div>
                
                {/* Label */}
                <div className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-12 shadow-xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to resolve your IT challenges?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Get in touch with our expert team and experience professional incident resolution services.
            </p>
            <Link href="/contact">
            <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Contact Us Today
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncidentResolutions;
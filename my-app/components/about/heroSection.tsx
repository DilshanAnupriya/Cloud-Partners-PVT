import React from 'react';
import { CheckCircle, ArrowRight, Cloud, Shield, Sparkles } from 'lucide-react';

function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-lime-400 rounded-full animate-ping"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-lime-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-lime-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-spin"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 lg:px-12 py-8 border-b border-gray-700/30 backdrop-blur-sm">
        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-white-400 to-white bg-clip-text text-transparent text-center">
          About Us
        </h1>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">
        
        {/* Left Content */}
        <div className="px-6 lg:px-12 py-12 lg:py-20 flex items-center">
          <div className="max-w-xl space-y-8 transform transition-all duration-1000">
            
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                You need information security services to proactively prevent and protect 
                confidential data, as well as detect internal and external threats. Protect 
                your business by choosing a managed security service provider. Our 
                security services can help ensure your business. Trusted by the world's best 
                organizations.
              </p>

              <p className="text-gray-300 leading-relaxed">
                For 15 years and running, it has been delivering smiles to hundreds of IT 
                advisors, developers, users, and business owners. Easy solutions for all 
                difficult IT problems to ensure high availability. Provide users with 
                appropriate view and access permissions to requests, problems, changes, 
                contracts, assets, solutions, and reports with our experienced professionals.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-4 space-y-2">
              <div className="flex items-center space-x-3 group transform transition-all duration-300 hover:translate-x-2 hover:scale-105">
                <div className="bg-gradient-to-r from-lime-400 to-lime-500 rounded-full p-1 shadow-lg group-hover:shadow-lime-400/50 transition-all duration-300">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-300 font-medium group-hover:text-lime-400 transition-colors duration-300">Eliminate repeat entries</span>
              </div>
              
              <div className="flex items-center space-x-3 group transform transition-all duration-300 hover:translate-x-2 hover:scale-105">
                <div className="bg-gradient-to-r from-lime-400 to-lime-500 rounded-full p-1 shadow-lg group-hover:shadow-lime-400/50 transition-all duration-300">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-300 font-medium group-hover:text-lime-400 transition-colors duration-300">Drive Business Process</span>
              </div>
              
              <div className="flex items-center space-x-3 group transform transition-all duration-300 hover:translate-x-2 hover:scale-105">
                <div className="bg-gradient-to-r from-lime-400 to-lime-500 rounded-full p-1 shadow-lg group-hover:shadow-lime-400/50 transition-all duration-300">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-300 font-medium group-hover:text-lime-400 transition-colors duration-300">Structure Data, and Docs</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 space-y-2">
              <div className="flex items-center space-x-3 group transform transition-all duration-300 hover:translate-x-2 hover:scale-105">
                <div className="bg-gradient-to-r from-lime-400 to-lime-500 rounded-full p-1 shadow-lg group-hover:shadow-lime-400/50 transition-all duration-300">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-300 font-medium group-hover:text-lime-400 transition-colors duration-300">Simplicity Communication</span>
              </div>
              
              <div className="flex items-center space-x-3 group transform transition-all duration-300 hover:translate-x-2 hover:scale-105">
                <div className="bg-gradient-to-r from-lime-400 to-lime-500 rounded-full p-1 shadow-lg group-hover:shadow-lime-400/50 transition-all duration-300">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-300 font-medium group-hover:text-lime-400 transition-colors duration-300">Speed Up Transactions</span>
              </div>
              
              <div className="flex items-center space-x-3 group transform transition-all duration-300 hover:translate-x-2 hover:scale-105">
                <div className="bg-gradient-to-r from-lime-400 to-lime-500 rounded-full p-1 shadow-lg group-hover:shadow-lime-400/50 transition-all duration-300">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-300 font-medium group-hover:text-lime-400 transition-colors duration-300">Automate Workflows</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Professional Image Section */}
        <div className="relative flex items-center justify-center">
          
          {/* Animated green accent border */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-lime-400 via-lime-500 to-lime-400 animate-pulse"></div>
          
          {/* Main content area with glass morphism */}
          <div className="relative flex items-center justify-center w-full h-full px-8">
            
            {/* Professional person placeholder */}
            <div className="relative transform transition-all duration-1000 hover:scale-105">
              {/* Person silhouette with modern styling */}
              <div className="w-80 h-96 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700 rounded-t-full relative overflow-hidden shadow-2xl border border-slate-600/50 backdrop-blur-sm transform transition-all duration-500 hover:shadow-lime-400/20">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-lime-400/10 to-transparent animate-pulse"></div>
                
                {/* Person avatar placeholder */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-80 bg-gradient-to-t from-slate-800 to-slate-600 rounded-t-full">
                  {/* Face area with glow */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full shadow-lg"></div>
                  {/* Body/shirt area */}
                  <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-slate-700 to-slate-600 rounded-t-3xl"></div>
                </div>
              </div>
              
              {/* Animated speech bubble/partnership callout */}
              <div className="absolute -right-8 top-12 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl max-w-xs transform rotate-3 border border-white/20 transition-all duration-500 hover:rotate-6 hover:scale-105">
                <div className="space-y-4">
                  {/* Company Logo */}
                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-3 flex items-center justify-center border border-slate-600 shadow-lg">
                    <img 
                      src="/companyLogo.png" 
                      alt="Company Logo" 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  
                  {/* Badge with gradient */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-lg shadow-lg border border-blue-500/30 transform transition-all duration-300 hover:scale-105">
                    <div className="text-sm font-medium">Google Authorized</div>
                    <div className="text-lg font-bold">Partner</div>
                  </div>
                  
                  {/* Partnership text with glow */}
                  <div className="text-center">
                    <div className="text-xl font-bold text-white mb-1">Partnership With</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent">Goolge</div>
                    <div className="w-8 h-1 bg-gradient-to-r from-lime-400 to-lime-500 mx-auto mt-2 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Floating sparkles - removed */}
            </div>
          </div>

          {/* Floating arrow indicator with enhanced animation */}
          <div className="absolute bottom-8 right-8 bg-gradient-to-r from-lime-400 to-lime-500 rounded-full p-3 animate-bounce shadow-lg shadow-lime-400/50 hover:shadow-lime-400/70 transition-all duration-300 cursor-pointer group">
            <ArrowRight className="h-6 w-6 text-white rotate-90 group-hover:rotate-180 transition-transform duration-500" />
          </div>

          {/* Animated bottom accent */}
          <div className="absolute bottom-0 right-0 w-1 h-32 bg-gradient-to-t from-lime-400 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
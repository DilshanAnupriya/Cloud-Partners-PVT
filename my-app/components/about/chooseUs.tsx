import React from 'react';
import { Users, Target, RefreshCw, Award } from 'lucide-react';

function ChooseUs() {
  const features = [
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Unparalleled Expertise',
      description: 'Years of industry experience and cutting-edge knowledge to deliver exceptional results.',
      gradient: 'from-blue-400 to-cyan-400'
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Client-Centric',
      description: 'Your success is our priority. We tailor solutions to meet your unique business needs.',
      gradient: 'from-purple-400 to-pink-400'
    },
    {
      icon: <RefreshCw className="w-12 h-12" />,
      title: 'Continuous Refinement',
      description: 'We constantly evolve and improve our processes to stay ahead of industry trends.',
      gradient: 'from-green-400 to-emerald-400'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Customer Satisfaction',
      description: 'Proven track record of delivering projects that exceed client expectations.',
      gradient: 'from-orange-400 to-red-400'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-20 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Why You <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Choose Us</span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            We combine expertise, innovation, and dedication to deliver solutions that drive your business forward.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
              500+
            </div>
            <div className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">Projects Completed</div>
          </div>
          <div className="group">
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
              98%
            </div>
            <div className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">Client Satisfaction</div>
          </div>
          <div className="group">
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
              7+
            </div>
            <div className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">Years Experience</div>
          </div>
          <div className="group">
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
              24/7
            </div>
            <div className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">Support Available</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
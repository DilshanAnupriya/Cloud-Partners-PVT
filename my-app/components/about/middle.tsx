import React from 'react';

function ModernTimeline() {
  const timelineData = [
    {
      year: '2017',
      title: 'Business Planning',
      description: 'Foundation and strategic planning phase'
    },
    {
      year: '2018',
      title: 'Started As A Freelancer',
      description: 'Launched independent services'
    },
    {
      year: '2019',
      title: 'Registered As An Organization',
      description: 'Official business establishment'
    },
    {
      year: '2020',
      title: 'Build A Strong Core Team',
      description: 'Expanded with talented professionals'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-50 to-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
            Explore Our Great History!!
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            One Of The{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trusted IT Service
            </span>
            <br />
            Providers Since 2018.
          </h1>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 transform -translate-y-1/2 rounded-full"></div>
            
            {/* Timeline Items */}
            <div className="relative flex flex-col md:flex-row justify-between items-center space-y-16 md:space-y-0">
              {timelineData.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  {/* Year Circle */}
                  <div className="relative z-10 mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-lg border border-gray-200">
                      <span className="text-lg font-bold text-gray-800">{item.year}</span>
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 max-w-xs group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
      
    </div>
  );
}

export default ModernTimeline;
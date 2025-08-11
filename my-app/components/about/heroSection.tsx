"use client";

import React from "react";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 mt-10 pt-20 min-h-screen">
      <div className="container mx-auto px-6 lg:px-16 py-16">
        
        {/* Hero Content */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-16">
          {/* Left Content */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white lg:text-5xl leading-tight mb-6">
              About <span className="text-blue-400">Our Company</span>
            </h1>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                We are a premier business handling company dedicated to streamlining operations 
                and driving growth for organizations across diverse industries. With years of 
                proven expertise, we specialize in comprehensive business management solutions 
                that allow our clients to focus on their core competencies while we handle 
                the complexities of operational excellence.
              </p>
              <p>
                Our team of seasoned professionals brings deep industry knowledge and innovative 
                approaches to every challenge. We pride ourselves on delivering measurable results 
                through strategic planning, efficient process optimization, and cutting-edge 
                technology integration that transforms how businesses operate in today's 
                competitive landscape.
              </p>
            </div>
            <div className="mt-8">
              <a
                href="#company-values"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg"
              >
                Learn More About Us
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/companyLogo.png"
              alt="Professional Business Solutions"
              width={500}
              height={500}
              className="rounded-2xl shadow-2xl object-cover"
            />
          </div>
        </div>

        {/* Company Values Section */}
        <div id="company-values" className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Core Values & Expertise
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Excellence */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Operational Excellence</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                We deliver superior business handling services through proven methodologies, 
                continuous improvement, and unwavering commitment to quality standards.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Strategic Innovation</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our forward-thinking approach combines industry best practices with 
                cutting-edge solutions to optimize business processes and drive sustainable growth.
              </p>
            </div>

            {/* Partnership */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Trusted Partnerships</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                We build long-term relationships based on trust, transparency, and mutual success, 
                becoming an integral extension of our clients' teams.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-20 bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Driving Business Success
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-300 text-sm">Clients Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
              <div className="text-gray-300 text-sm">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-300 text-sm">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">10+</div>
              <div className="text-gray-300 text-sm">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Your Business Operations?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Partner with us to streamline your business processes, reduce operational costs, 
            and focus on what matters most – growing your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg"
            >
              Get Started Today
            </a>
            <a
              href="/services"
              className="border-2 border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              View Our Services
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
"use client";

import React from "react";
import Image from "next/image";

function HeroSection() {
  return (
      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 mt-10 pt-20 h-screen">
        <div className="container mx-auto px-6 lg:px-16 py-16 flex flex-col-reverse lg:flex-row items-center gap-10">

          {/* Left Content */}
          <div className="flex-1 ">
            <h1 className="text-4xl font-bold text-white  lg:text-5xl text-center justify-center  leading-tight ">
              About <span className="text-white ">Our Company</span>
            </h1>
            <p className="mt-9 text-gray-400 text-lg leading-relaxed">
              We are committed to delivering innovative solutions that empower
              businesses to thrive in a fast-changing digital world.
              With a passionate team and years of expertise, we focus on creating
              value for our clients and building long-lasting relationships.
            </p>
            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
              We are committed to delivering innovative solutions that empower
              businesses to thrive in a fast-changing digital world.
              With a passionate team and years of expertise, we focus on creating
              value for our clients and building long-lasting relationships.
            </p>
            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            We are committed to delivering innovative solutions that empower
            businesses to thrive in a fast-changing digital world.
            With a passionate team and years of expertise, we focus on creating
            value for our clients and building long-lasting relationships.
          </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 ">
              <a
                  href="/services"
                  className="border-2 border-slate-600 text-slate-300 px-8 py-4 rounded-xl font-semibold shadow  transition"
              >
                scroll down
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center">
            <Image
                src="/companyLogo.png"
                alt="About Our Company"
                width={500}
                height={500}
                className="rounded-2xl shadow-lg object-cover"
            />
          </div>

        </div>
      </section>
  );
}

export default HeroSection;

"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import Link from "next/link";
import Image from "next/image";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-8xl mx-auto w-full bg-gray-200 mb-20 pl-20 pr-20 pb-20 pt-20" >
      {/* Mission */}
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[320px] bg-gradient-to-br from-orange-600 to-amber-700"
      >
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-wide text-white/80">Cloud Partners (Pvt) Ltd</p>
          <h2 className="mt-1 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            We empower businesses with modern cloud solutions
          </h2>
          <p className="mt-4 text-left text-base/6 text-orange-50">
            We implement, integrate, and support Zoho & Google Workspace, automation and AI workflows so your teams move faster with confidence.
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs text-orange-50/90">
            <span className="rounded-full bg-white/10 px-3 py-1">Certified Partners</span>
            <span className="rounded-full bg-white/10 px-3 py-1">24/7 Support</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Secure by design</span>
          </div>
          <div className="mt-6">
            <Link href="/contact" className="inline-flex items-center rounded-md bg-black/20 px-4 py-2 text-white backdrop-blur hover:bg-black/30 transition">
              Talk to us
            </Link>
          </div>
        </div>
        <Image
          src="/companyLogo.png"
          width={300}
          height={220}
          alt="Cloud Partners logo"
          className="absolute -right-4 lg:-right-[5%] bottom-10 object-contain rounded-2xl opacity-90"
          priority
        />
      </WobbleCard>

      {/* Values */}
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-[#0b1023]">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Our values
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          We build lasting partnerships through trust, transparency, and continuous improvement. Your success is our north star.
        </p>
        <ul className="mt-4 text-neutral-200 text-sm space-y-2">
          <li>• Customer-first delivery</li>
          <li>• Secure, scalable architectures</li>
          <li>• Measurable outcomes, not buzzwords</li>
        </ul>
      </WobbleCard>

      {/* What we do */}
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-gradient-to-tr from-blue-900 to-indigo-800 min-h-[500px] lg:min-h-[600px] xl:min-h-[320px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            What we do
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Implementation, migration, and optimization across Zoho, Google Workspace, CRM, automation, analytics, and custom integrations tailored to your workflows.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 text-xs text-blue-100">
            <span className="rounded-md bg-white/10 px-3 py-1">Zoho Suite</span>
            <span className="rounded-md bg-white/10 px-3 py-1">Google Workspace</span>
            <span className="rounded-md bg-white/10 px-3 py-1">CRM & Automation</span>
            <span className="rounded-md bg-white/10 px-3 py-1">AI & Analytics</span>
          </div>
        </div>
        <Image
          src="/ourTeam.jpg"
          width={600}
          height={400}
          alt="Our team collaborating"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-cover rounded-2xl shadow-lg"
        />
      </WobbleCard>
    </div>
  );
}
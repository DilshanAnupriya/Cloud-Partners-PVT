"use client";

import React, { useRef } from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { useScroll, useTransform } from "motion/react";

const GeminiSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress over the section to drive the SVG path lengths
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Create sequential path animations - each line completes before the next starts
   const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
 

  return (
    <section ref={ref} className="w-full h-[300vh] bg-white relative">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        <GoogleGeminiEffect
          pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]}
          title="Google Gemini Effect"
          description="Scroll to reveal smooth, layered motion paths."
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default GeminiSection;
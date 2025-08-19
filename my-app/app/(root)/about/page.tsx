import React from 'react'
import HeroSection from "@/components/about/heroSection";
import ModernTimeline from "@/components/about/middle";
import ChooseUs from "@/components/about/chooseUs";
import IncidentResolutions from "@/components/about/last";

function About() {
    return (
        <div>
            <ChooseUs/>
            <IncidentResolutions/>
        </div>
    )
}

export default About

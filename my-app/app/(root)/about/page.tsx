import React from 'react'
import ChooseUs from "@/components/about/chooseUs";
import IncidentResolutions from "@/components/about/last";

import { TabsDemo } from "@/components/ui/TabsDemo";
import { WobbleCardDemo } from "@/components/ui/WobbleCardDemo";

function About() {
    return (
        <div>
            <ChooseUs/>
             <WobbleCardDemo />
        </div>
    )
}

export default About

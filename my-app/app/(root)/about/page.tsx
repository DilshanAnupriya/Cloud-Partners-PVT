import ChooseUs from '@/components/about/chooseUs'
import HeroSection from '@/components/about/heroSection'
import IncidentResolutions from '@/components/about/last'
import ModernTimeline from '@/components/about/middle'
import { MicrochipIcon } from 'lucide-react'
import React from 'react'

function page() {
  return (
    <div>
      <HeroSection/>
      <ModernTimeline/>
      <ChooseUs/>
      <IncidentResolutions/>
      </div>
  )
}

export default page
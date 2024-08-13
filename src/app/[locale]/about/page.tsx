import { AboutHeader, AboutFeatures, About, Testimonials } from '@/components'
import React from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | World Wide Travel',
}

const page = () => {
  return (
    <div>
      <AboutHeader />
      <About />
      <AboutFeatures />
      <Testimonials />
    </div>
  )
}

export default page
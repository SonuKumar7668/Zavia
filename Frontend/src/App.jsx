import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import WhyTrust from './components/WhyTrust'
import Features from './components/Features'
import Education from './components/Education'
import CTASection from './components/CTASection'

function App() {

  return (
    <>
       <Hero/>
     <WhyTrust />
      <Features />
      <Education />
      <CTASection />
    </>
  )
}

export default App

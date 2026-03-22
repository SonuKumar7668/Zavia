import React from 'react'
import Hero from "./Hero";
import Features from './Features';
import HowItWorks from './HowItWorks';
import AiCTA from './AiCTA';
import ExploreSection from './ExploreSection';  
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturedMentors from "../components/FeaturesMentors";
import SuccessStories from "../components/SuccessStories";
import ChatBotLink from '../components/ChatbotLink';

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks/>
      <AiCTA/>
      <ExploreSection />
      {/* <WhyChooseUs /> */}
      {/* <FeaturedMentors /> */}
      {/* <ChatBotLink/> */}
      {/* <SuccessStories /> */}
    </div>
  )
}
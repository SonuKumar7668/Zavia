import React from 'react'
import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturedMentors from "../components/FeaturesMentors";
import SuccessStories from "../components/SuccessStories";
import ChatBotLink from '../components/ChatbotLink';

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <WhyChooseUs />
      <FeaturedMentors />
      <ChatBotLink/>
      <SuccessStories />
    </div>
  )
}
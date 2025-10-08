import React from 'react'
import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturedMentors from "../components/FeaturesMentors";
import SuccessStories from "../components/SuccessStories";
import Footer from "../components/Footer";
import ProfileCard from "../components/ProfileCard";
import MentorSlider from "../components/MentorSlider";
// import MentorProfile from "../components/MentorProfile";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <WhyChooseUs />
      <FeaturedMentors />
      <SuccessStories />
      {/* <ProfileCard/> */}
      {/* <MentorSlider/> */}
      {/* <MentorProfile/> */}
    </div>
  )
}
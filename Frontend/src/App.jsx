import Header from "./components/Header";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/WhyChooseUs";
import FeaturedMentors from "./components/FeaturesMentors";
import SuccessStories from "./components/SuccessStories";
import Footer from "./components/Footer";
import ProfileCard from "./components/ProfileCard";
import MentorSlider from "./components/MentorSlider";
import MentorProfile from "./components/MentorProfile";


function App() {
  return (
    <div>
      <Header />
      <Hero />
      <WhyChooseUs />
      <FeaturedMentors />
      <SuccessStories />
      <Footer />
      <ProfileCard/>
      <MentorSlider/>
      <MentorProfile/>
    </div>
  );
}
export default App;


import './App.css';
import CTASection from './components/CTASection';
import Education from './components/Education';
import Features from './components/Features';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import WhyTrust from './components/WhyTrust';

function App() {
  return (
    <>
     <Hero/>
     <WhyTrust />
      <Features />
      <Pricing />
      <Education />
      <CTASection />
    </>
  );
}

export default App;

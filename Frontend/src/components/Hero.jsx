const Hero = () => {
  return (
    <section id="home" className="pt-24 md:pt-32 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Bridge the Gap Between <span className="text-yellow-300">Dreams</span> and <span className="text-yellow-300">Mentorship</span>
        </h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg">
          Zavia connects students and professionals with mentors who guide them based on skills, goals, and career aspirations.
        </p>
        <a href="#mentors" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-200">
          Find Your Mentor
        </a>
      </div>
    </section>
  );
};
export default Hero;

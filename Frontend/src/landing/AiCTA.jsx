const AiCTA = () => {
  return (
    <section className="bg-primary py-20 relative overflow-hidden">

      {/* Background Glow Effect */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-secondary to-highlight"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Not Sure What to Do Next?
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-white/80 max-w-2xl mx-auto">
          Let Zavia AI guide you with personalized career advice, job suggestions,
          and skill recommendations — instantly.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <button className="bg-highlight text-black px-8 py-4 rounded-xl font-semibold text-lg shadow-md hover:opacity-90 transition">
            Start Conversation
          </button>
        </div>

        {/* Chat Preview Card */}
        <div className="mt-12 max-w-xl mx-auto bg-white rounded-2xl p-6 shadow-lg text-left">

          <p className="text-sm text-gray-500">
            You:
          </p>
          <p className="text-gray-800 font-medium">
            I don’t know which career to choose
          </p>

          <div className="mt-4">
            <p className="text-sm text-primary font-semibold">
              Zavia AI:
            </p>
            <p className="text-gray-700">
              Based on your interests, you should explore Web Development or UI/UX Design.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AiCTA;
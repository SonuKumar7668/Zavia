const Features = () => {
  const features = [
    {
      title: "1:1 Mentorship",
      desc: "Connect with industry experts for personalized guidance.",
    },
    {
      title: "AI Career Guide",
      desc: "Get smart career suggestions based on your profile.",
    },
    {
      title: "Job Opportunities",
      desc: "Explore jobs tailored to your skills and interests.",
    },
    {
      title: "Smart Recommendations",
      desc: "AI-driven suggestions to boost your growth.",
    },
    {
      title: "Easy Booking",
      desc: "Schedule mentor sessions in just a few clicks.",
    },
    {
      title: "Skill Insights",
      desc: "Understand what skills you need to succeed.",
    },
  ];

  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Everything You Need to Grow Your Career
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Zavia brings mentorship, jobs, and AI guidance together to help you make better career decisions.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Features;
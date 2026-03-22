const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Create Your Profile",
      desc: "Sign up and build your profile with your skills, interests, and goals.",
    },
    {
      step: "02",
      title: "Get AI Guidance",
      desc: "Receive personalized career suggestions and recommendations instantly.",
    },
    {
      step: "03",
      title: "Connect & Grow",
      desc: "Connect with mentors or apply for jobs that match your profile.",
    },
  ];

  return (
    <section className="bg-background py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          How Zavia Works
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Get started in just a few simple steps and take control of your career journey.
        </p>

        {/* Steps */}
        <div className="mt-16 grid md:grid-cols-3 gap-10">

          {steps.map((item, index) => (
            <div key={index} className="relative">

              {/* Step Number */}
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-primary text-white font-bold text-lg shadow-md">
                {item.step}
              </div>

              {/* Card */}
              <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>

              {/* Connector Line (only for desktop) */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-7 right-[-50%] w-full h-1 bg-secondary"></div>
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
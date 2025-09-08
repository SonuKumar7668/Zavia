const WhyChooseUs = () => {
  const points = [
    { title: "Personalized Mentorship", desc: "Get matched with mentors who align with your skills and aspirations." },
    { title: "Industry Experts", desc: "Learn directly from experienced professionals across diverse industries." },
    { title: "Career Growth", desc: "Access resources and strategies that fast-track your career journey." },
  ];

  return (
    <section id="why" className="py-16 px-6 container mx-auto text-center">
      <h2 className="text-3xl font-bold mb-10">Why Choose Zavia?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {points.map((p, i) => (
          <div key={i} className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg">
            <h3 className="font-bold text-xl mb-2">{p.title}</h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default WhyChooseUs;

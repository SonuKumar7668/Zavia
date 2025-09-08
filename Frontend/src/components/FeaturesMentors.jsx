const FeaturedMentors = () => {
  const mentors = [
    { name: "Amit Sharma", role: "Software Engineer @ Google" },
    { name: "Neha Patel", role: "Data Scientist @ Microsoft" },
    { name: "Ravi Kumar", role: "Product Manager @ Amazon" },
  ];

  return (
    <section id="mentors" className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Meet Our Mentors</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {mentors.map((m, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow hover:shadow-xl">
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="font-bold text-lg">{m.name}</h3>
              <p className="text-sm text-gray-600">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturedMentors;

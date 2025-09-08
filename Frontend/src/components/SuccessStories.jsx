const SuccessStories = () => {
  const stories = [
    { text: "Zavia helped me land my dream job with the right guidance!", user: "Rohan (Engineer)" },
    { text: "The mentorship gave me confidence for my portfolio and interviews.", user: "Priya (Designer)" },
    { text: "I successfully switched careers with mentor support from Zavia.", user: "Arjun (Professional)" },
  ];

  return (
    <section id="stories" className="py-16 px-6 container mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">Success Stories</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {stories.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <p>"{s.text}"</p>
            <h4 className="mt-4 font-bold">- {s.user}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};
export default SuccessStories;

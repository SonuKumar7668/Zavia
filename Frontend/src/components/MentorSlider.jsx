// src/components/MentorSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Dummy profile images (replace with real ones)
import profile1 from "../assets/mentor1.jpg";
import profile2 from "../assets/mentor2.jpg";
import profile3 from "../assets/mentor3.jpg";
import profile4 from "../assets/mentor4.jpg";

export default function MentorSlider() {
  const mentors = [
    {
      id: 1,
      tag: "Career",
      title: "Career Growth Strategies",
      description:
        "Discover how personalized mentorship can accelerate your career growth by focusing on skills, networking, and industry insights.",
      img: profile1,
      name: "Ananya Sharma",
      role: "Career Coach",
    },
    {
      id: 2,
      tag: "Development",
      title: "Full-Stack Roadmap 2025",
      description:
        "Learn the most in-demand technologies and structured learning paths to become a successful full-stack developer.",
      img: profile2,
      name: "Ravi Kumar",
      role: "Full-Stack Developer",
    },
    {
      id: 3,
      tag: "Design",
      title: "UX Portfolio Mastery",
      description:
        "Build a portfolio that stands out. Tips on case studies, storytelling, and presenting design work effectively.",
      img: profile3,
      name: "Sofia Fernandez",
      role: "UX Designer",
    },
    {
      id: 4,
      tag: "Networking",
      title: "Building Professional Connections",
      description:
        "Master the art of professional networking to connect with mentors, recruiters, and peers effectively.",
      img: profile4,
      name: "James Lee",
      role: "Networking Expert",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white to-purple-50 py-12 px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">
        Explore Mentor Insights
      </h2>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop
      >
        {mentors.map((mentor) => (
          <SwiperSlide key={mentor.id}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition p-4">
              <div className="relative flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={mentor.img}
                  alt={mentor.title}
                  className="w-full h-56 object-contain rounded-lg transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                  {mentor.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{mentor.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{mentor.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={mentor.img}
                      alt={mentor.name}
                      className="w-10 h-10 rounded-full object-contain border border-gray-200"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{mentor.name}</p>
                      <p className="text-xs text-gray-500">{mentor.role}</p>
                    </div>
                  </div>
                  <button className="text-sm bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-full shadow hover:opacity-90">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

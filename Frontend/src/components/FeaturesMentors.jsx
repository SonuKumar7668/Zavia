import React,{useEffect,useState} from "react";
import axios from "axios";
import MentorCard from "./MentorCard";

const FeaturedMentors = () => {
  const [mentors,setMentors] = useState([]);
  useEffect(()=>{
    const fetchMentors = async () => {
      try {
        const backend=import.meta.env.VITE_BACKEND_API;
        const response = await axios.get(`${backend}/mentor`); // Replace with your API endpoint
        const data = response.data.slice(0, 3); // Get only 3 mentors
        setMentors(data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };
    fetchMentors();
  },[])
  // const mentors = [
  //   { name: "Amit Sharma", role: "Software Engineer @ Google" },
  //   { name: "Neha Patel", role: "Data Scientist @ Microsoft" },
  //   { name: "Ravi Kumar", role: "Product Manager @ Amazon" },
  // ];

  return (
    <section id="mentors" className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Meet Our Mentors</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {mentors.map((profile, index) => (
            <MentorCard key={index} mentor={profile} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturedMentors;

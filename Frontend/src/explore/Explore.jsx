import React,{useEffect,useState} from 'react'
import MentorCard from '../components/MentorCard';
import axios from 'axios';
export default function Explore() {
  const [mentors,setMentors]=useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      const backend=import.meta.env.VITE_BACKEND_URL;
      try {
        const response = await axios.get(`${backend}/mentor`); // Replace with your API endpoint
        setMentors(response.data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };

    fetchMentors();
  },[]);

  return (
    <div className="min-h-screen bg-background">
    <main className="pt-4 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight mb-4">
            Explore Professionals
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover and connect with talented professionals from around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mentors.map((profile, index) => (
            <MentorCard key={index} mentor={profile} />
          ))}
        </div>
      </div>
    </main>
  </div>
  )
}

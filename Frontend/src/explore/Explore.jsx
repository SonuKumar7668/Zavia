import React,{useEffect,useState} from 'react'
import MentorCard from '../components/MentorCard';
import MentorCardSkeleton from '../skeleton/MentorCardSkeleton';
import axios from 'axios';
import { useLocation } from 'react-router';
export default function Explore() {
  const [mentors,setMentors]=useState(null);
  const location=useLocation();

  const queryParams=new URLSearchParams(location.search);
  const searchQuery=queryParams.get('search') || '';

  useEffect(() => {
    const fetchMentors = async (searchQuery) => {
      const backend=import.meta.env.VITE_BACKEND_API;
      try {
        const response = await axios.get(`${backend}/mentor`,{
          params: { search: searchQuery }
        }); // Replace with your API endpoint
        setMentors(response.data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };

    fetchMentors(searchQuery);
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
        {mentors ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mentors.map((profile, index) => (
            <MentorCard key={index} mentor={profile} />
          ))}
        </div>
        : 
        <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <MentorCardSkeleton/>
        <MentorCardSkeleton/>
        <MentorCardSkeleton/>
        <MentorCardSkeleton/>
        </div>
        }
      </div>
    </main>
  </div>
  )
}

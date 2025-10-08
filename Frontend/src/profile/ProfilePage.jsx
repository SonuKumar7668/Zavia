import React, { useEffect } from 'react'
import MentorProfile from './MentorProfile';
import SessionCard from './SessionCard';
import axios from 'axios';
import { useParams } from 'react-router';


export default function ProfilePage() {
  const {id} = useParams();
  const [session, setSession] = React.useState([]);
  useEffect(() => {
    const getSessions = async () => {
      if(!localStorage.getItem("token")) return;
      const backendUrl = import.meta.env.VITE_BACKEND_API;
      const response = await axios.get(`${backendUrl}/session/check/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      });
      setSession(response.data.session);
      // Placeholder for fetching sessions logic
      console.log("Fetching sessions...");
    };
    getSessions();
  },[id])

  return (
    <div>
      <MentorProfile/>
      <div>
        <h2 className='text-2xl font-bold text-gray-800 text-center mt-8 mb-4'>Upcoming Sessions</h2>
        
        {session.map((sess)=>
            sess.status === "upcoming" &&
          (<SessionCard key={sess._id} session={sess}/>)
          )}
      </div>
      <div>
        <h2 className='text-2xl font-bold text-gray-800 text-center mt-8 mb-4'>completed Sessions</h2>
        
        {session.map((sess)=>

            {sess.status === "completed" &&
          (<SessionCard key={sess._id} session={sess}/>)
          }
        )}
      </div>
      <div>
        <h2 className='text-2xl font-bold text-gray-800 text-center mt-8 mb-4'>Cancled Sessions</h2>
        
        {session.map((sess)=>{
          
            sess.status === "cancled" &&
          (<SessionCard key={sess._id} session={sess}/>)
          
        })}
      </div>
    </div>
  )
}

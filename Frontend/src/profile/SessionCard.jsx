import React, { useEffect, useState } from 'react';
// import {Link} from "react-router";
import { useSocket } from '../context/SocketProvider';
// import {io} from "socket.io-client";
import { useNavigate } from 'react-router';

const SessionCard = ({session}) => {
  const [status, setStatus] = useState('pending');
  const mentor = session.mentorId;
  useEffect(()=>{
    setStatus(session.status);
  },[])
  // const socket = useSocket();
  
  const navigate = useNavigate();

  const statusColor = status === 'completed' ? 'bg-green-500' :
                      status === 'cancelled' ? 'bg-red-500' :
                      'bg-yellow-500';

  const socket = useSocket();
  const joinSession = (e) => {
    e.preventDefault();
    // const backendUrl = import.meta.env.VITE_BACKEND_API || "http://localhost:8080";
    // const socket = io(backendUrl);
    console.log(socket);
    socket.emit("join:room",session.roomId);
    console.log("Joined: ",session.roomId);
    navigate(`/videocall/${session.roomId}`);
  }

  const cancleSession = () => {
    console.log("yet to handle cancle");
  }

  return (
    <div className="flex justify-center  bg-gray-100 p-4">
      {/* The main card container */}
      <div className="w-full max-w-3xl min-h-[50px] max-h-[80px] flex justify-between items-center bg-white p-4 rounded-xl shadow-lg border border-gray-200">
        
        {/* Left side: Title and Description */}
        <div className="flex-grow flex items-center overflow-hidden">
          <div className={`w-3 h-3 rounded-full ${statusColor} mr-3 flex-shrink-0`}></div>
          <div className="flex flex-col overflow-hidden whitespace-nowrap">
            <h2 className="text-sm md:text-base font-semibold text-gray-800 truncate">{mentor.name}</h2>
            <p className="text-xs text-gray-500 truncate mt-1">
              {mentor.bio}
            </p>
          </div>
        </div>
        
        {/* Right side: Buttons */}
        <div className="flex items-center space-x-2 flex-shrink-0 ml-4">

          <button
          onClick={joinSession}
          className="cursor-pointer px-3 py-1 text-sm font-medium text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Join
          </button>

          <button
          onClick={cancleSession}
            className="cursor-pointer px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;

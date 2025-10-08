import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';

const SessionCard = ({ session }) => {
  const [status, setStatus] = useState('pending');
  const [statusColor, setStatusColor] = useState(null);
  const [sessionsCompleted, setSessionsCompleted] = useState(session.sessionsCompleted || 0);
  const [expiryDate, setExpiryDate] = useState(null);

  const mentor = session.mentorId;
  const navigate = useNavigate();

  useEffect(() => {
    setStatus(session.status);
    setSessionsCompleted(session.sessionsCompleted || 0);

    // 2-week expiry window from the initial booking date
    const bookingDate = dayjs(session.createdAt);
    const expiry = bookingDate.add(14, 'day');
    setExpiryDate(expiry.format('MMM D, YYYY'));

    // Color indicator based on status
    const color =
      status === 'completed'
        ? 'bg-green-500'
        : status === 'cancelled'
        ? 'bg-red-500'
        : status === 'expired'
        ? 'bg-gray-400'
        : 'bg-yellow-500';

    setStatusColor(color);
  }, [session, status]);

  const joinSession = (e) => {
    e.preventDefault();
    if (sessionsCompleted >= 3 || status === 'expired') return;
    console.log('Joined:', session._id);
    navigate(`/videocall/${session._id}`);
  };

  const cancelSession = async () => {
    const backend = import.meta.env.VITE_BACKEND_API;
    try {
      const response = await axios.post(
        `${backend}/session/cancel`,
        { sessionId: session._id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Cancelled:', response.data);
      setStatus('cancelled');
    } catch (error) {
      console.error('Cancel failed:', error);
    }
  };

  const sessionsRemaining = 3 - sessionsCompleted;

  return (
    <div className="flex justify-center bg-gray-100 p-4">
      {/* Card container */}
      <div className="w-full max-w-3xl bg-white p-5 rounded-xl shadow-md border border-gray-200 flex flex-col md:flex-row justify-between items-center transition-all hover:shadow-lg">
        {/* Left: Mentor Info */}
        <div className="flex items-center space-x-3 flex-grow overflow-hidden">
          <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
          <div className="flex flex-col overflow-hidden">
            <h2 className="text-base font-semibold text-gray-800 truncate">{mentor?.name}</h2>
            <p className="text-sm text-gray-500 truncate">{mentor?.bio}</p>
            <p className="text-xs text-gray-400 mt-1">
              Active till <span className="font-medium text-gray-600">{expiryDate}</span>
            </p>
          </div>
        </div>

        {/* Middle: Progress indicator */}
        <div className="hidden md:flex flex-col items-center mx-6">
          <p className="text-xs text-gray-500 mb-1">Sessions</p>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < sessionsCompleted ? 'bg-accent' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">{sessionsCompleted}/3 done</p>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center space-x-2 mt-3 md:mt-0">
          {status === 'upcoming' && sessionsCompleted < 3 && (
            <button
              onClick={joinSession}
              className="cursor-pointer px-3 py-1 text-sm font-medium text-white bg-primary bg-accent rounded-full hover:bg-accent/90 transition"
            >
              Join
            </button>
          )}

          {sessionsRemaining > 0 && status !== 'cancled' && (
            <button
              onClick={cancelSession}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}

          {sessionsCompleted >= 3 && (
            <span className="text-xs text-green-600 font-semibold">Completed ✅</span>
          )}

          {status === 'expired' && (
            <span className="text-xs text-gray-500 font-semibold">Expired ⏰</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionCard;

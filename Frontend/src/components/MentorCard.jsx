import React from 'react'
import { DollarSign, GraduationCap,IndianRupee } from 'lucide-react';
import { Link } from 'react-router';

export default function MentorCard({mentor}) {
  // const [mentors, setMentor] = useState(mentor);
    const {_id,name, highestEducation, meetingCharge}=mentor;
    // console.log(mentors);
  return (
   <Link to={`/mentor/profile/${_id}`}>
  <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1 cursor-pointer">
    
    {/* Image */}
    <div className="relative aspect-square overflow-hidden bg-gray-100">
      <img
        src="https://i.ibb.co/RpYtQM5Y/logo.png"
        alt={`${name} profile`}
        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>

    {/* Content */}
    <div className="p-5 space-y-4">
      
      {/* Name */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
          {name}
        </h3>
        <div className="flex items-center text-gray-500 mt-1">
          <GraduationCap className="w-4 h-4 mr-2" />
          <span className="text-sm">{highestEducation}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/* Pricing Section */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Session Rate</span>
        <span className="text-base font-semibold text-gray-900">
          ₹{meetingCharge}
          <span className="text-xs font-normal text-gray-500 ml-1">
            / hour
          </span>
        </span>
      </div>

      {/* CTA */}
      <div className="pt-2">
        <div className="w-full text-center text-sm font-medium text-primary border border-gray-200 rounded-lg py-2 group-hover:bg-gray-50 transition">
          View Profile
        </div>
      </div>

    </div>
  </div>
</Link>
  )
}

import React from 'react'
import { DollarSign, GraduationCap,IndianRupee } from 'lucide-react';
import { Link } from 'react-router';

export default function MentorCard({mentor}) {
  // const [mentors, setMentor] = useState(mentor);
    const {_id,name, highestEducation, meetingCharge}=mentor;
    // console.log(mentors);
  return (
    <Link to={`/mentor/profile/${_id}`}>
<div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden transition-spring hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      {/* Image Section */}
      <div className="aspect-square overflow-hidden">
        <img
          src="https://i.ibb.co/RpYtQM5Y/logo.png"
          alt={`${name} profile`}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <h3 className="font-semibold text-card-foreground text-lg leading-tight">
          {name}
        </h3>
        
        {/* Education */}
        <div className="flex items-center text-muted-foreground">
          <GraduationCap className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{highestEducation}</span>
        </div>
        
        {/* Meeting Charge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-muted-foreground">
          &#8377;
            <span className="text-sm">Meeting Rate</span>
          </div>
          <span variant="secondary" className="font-semibold">
          &#8377;{meetingCharge}/hr
          </span>
        </div>
      </div>
    </div>
    </Link>
  )
}

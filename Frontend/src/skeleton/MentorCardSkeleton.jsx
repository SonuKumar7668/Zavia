import React from 'react';

function MentorCardSkeleton() {
    return (
      <div className="bg-card border-border rounded-xl shadow-sm overflow-hidden animate-pulse">
        {/* Image Section */}
        <div className="aspect-square overflow-hidden bg-gray-200" />
  
        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Name */}
          <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto" />
  
          {/* Education */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded-full" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
  
          {/* Meeting Charge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded-full" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>
    );
  }
  
  export default MentorCardSkeleton;
  
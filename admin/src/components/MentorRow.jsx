import React from 'react'
import { Link } from 'react-router'

export default function MentorRow({ mentor, onApprove, onReject }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-sm">
        <Link to={`/pending/${mentor._id}`} className="text-indigo-600 hover:underline">
          {mentor._id}
        </Link>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={mentor.profileImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name || 'Mentor')}`}
            alt={mentor.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium">{mentor.name || '—'}</div>
            <div className="text-xs text-gray-500">{mentor.email || '—'}</div>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-sm">
        {mentor.skills?.length ? mentor.skills.join(', ') : '—'}
      </td>

      <td className="px-4 py-3 text-sm">
        {mentor.country ? `${mentor.city ? mentor.city + ', ' : ''}${mentor.country}` : '—'}
      </td>

      {/* <td className="px-4 py-3 text-sm">
        <div className="flex gap-2">
          <button
            onClick={() => onApprove(mentor._id)}
            className="px-3 py-1 rounded-md text-sm bg-green-50 text-green-700 hover:bg-green-100"
          >
            Approve
          </button>
          <button
            onClick={() => onReject(mentor._id)}
            className="px-3 py-1 rounded-md text-sm bg-red-50 text-red-700 hover:bg-red-100"
          >
            Reject
          </button>
        </div>
      </td> */}
    </tr>
  )
}

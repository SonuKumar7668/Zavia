import React from 'react'
import { NavLink } from 'react-router';
import { ClipboardClock,User, ChartArea, Settings } from 'lucide-react';

const links = [
  { to: '/', label: 'Pending Mentor Approvals', icon: <ClipboardClock /> },
  { to: '/users', label: 'Users', icon: <User /> },
  { to: '/analytics', label: 'Analytics', icon: <ChartArea /> },
  { to: '/settings', label: 'Settings', icon: <Settings /> },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-primary/5 border-r border-gray-200 p-4">
      <div className="mb-8 px-2">
        <div className="text-lg font-bold text-indigo-700">ZAVIA - Admin</div>
        <div className="text-sm text-gray-500 mt-1">Digital Mentorship & Guidance Platform</div>
      </div>

      <nav className="space-y-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 px-3 text-xs text-gray-500">
        Admin tools
      </div>
    </aside>
  )
}

import React, { useEffect, useState } from 'react'
import MentorRow from '../components/MentorRow'
import axios from 'axios';
import { sampleMentors } from '../lib/sampleData'

export default function PendingMentors() {
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPending()
  }, [])

  async function fetchPending() {
    setLoading(true)
    setError(null)
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_API || '';
      const res = await axios.get(`${apiUrl}/admin/mentors/pending/pending`);
      
        // fallback to sample data if API not reachable
        console.log(res.data);
        setMentors(res.data || [])
    } catch (err) {
        console.log(err);
      setMentors(sampleMentors.filter(m => m.status === 'pending'))
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove(id) {
    try {
      await fetch(`/api/admin/mentors/${id}/approve`, { method: 'POST', credentials: 'include' })
      setMentors(prev => prev.filter(m => m._id !== id))
    } catch (err) {
      alert('Approve failed: ' + err.message)
    }
  }

  async function handleReject(id) {
    const reason = prompt('Reason for rejection (optional):')
    try {
      await fetch(`/api/admin/mentors/${id}/reject`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      })
      setMentors(prev => prev.filter(m => m._id !== id))
    } catch (err) {
      alert('Reject failed: ' + err.message)
    }
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Pending Mentor Approvals</h2>
      <div className="mb-4 text-sm text-gray-600">
        Click an ID or name to view full request details.
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : mentors.length === 0 ? (
        <div className="text-gray-500">No pending mentors.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-xs text-gray-500 uppercase">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Mentor</th>
                <th className="px-4 py-2">Skills</th>
                <th className="px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map(m => (
                <MentorRow key={m._id} mentor={m} onApprove={handleApprove} onReject={handleReject} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

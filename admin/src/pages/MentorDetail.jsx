import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { sampleMentors } from '../lib/sampleData'

function InfoRow({ label, value }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-2 border-b">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="col-span-2 text-sm">{value || '—'}</div>
    </div>
  )
}

export default function MentorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [mentor, setMentor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMentor()
    // eslint-disable-next-line
  }, [id])

  async function fetchMentor() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/mentors/${id}`, { credentials: 'include' })
      if (!res.ok) {
        // fallback to sample data
        const found = sampleMentors.find(m => m._id === id)
        if (found) setMentor(found)
        else throw new Error('Mentor not found')
      } else {
        const data = await res.json()
        setMentor(data.mentor)
      }
    } catch (err) {
      setError(err.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove() {
    if (!confirm('Approve this mentor?')) return
    try {
      await fetch(`/api/admin/mentors/${id}/approve`, { method: 'POST', credentials: 'include' })
      alert('Approved')
      navigate('/pending-mentors')
    } catch (err) {
      alert('Approve failed: ' + err.message)
    }
  }

  async function handleReject() {
    const reason = prompt('Reason for rejection (optional):')
    if (reason === null) return
    try {
      await fetch(`/api/admin/mentors/${id}/reject`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      })
      alert('Rejected')
      navigate('/pending-mentors')
    } catch (err) {
      alert('Reject failed: ' + err.message)
    }
  }

  if (loading) return <div>Loading mentor…</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!mentor) return <div className="text-gray-500">No data</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={mentor.profileImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name || 'Mentor')}&size=128`}
            alt={mentor.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{mentor.name}</h2>
            <div className="text-sm text-gray-500">{mentor.email}</div>
            <div className="text-sm text-gray-500">{mentor.city ? `${mentor.city}, ${mentor.state}, ${mentor.country}` : ''}</div>
            <div className="mt-1 text-sm">Status: <span className="font-medium">{mentor.status}</span></div>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={handleApprove} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">Approve</button>
          <button onClick={handleReject} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">Reject</button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-md p-4">
        <h3 className="text-lg font-medium mb-3">Mentor profile</h3>

        <InfoRow label="Bio" value={mentor.bio} />
        <InfoRow label="Languages" value={mentor.language?.length ? mentor.language.join(', ') : ''} />
        <InfoRow label="Skills" value={mentor.skills?.length ? mentor.skills.join(', ') : ''} />
        <InfoRow label="Meeting charge" value={mentor.meetingCharge ? `₹${mentor.meetingCharge}` : 'Free / 0'} />
        <InfoRow label="Availability" value={mentor.availability} />
        <InfoRow label="LinkedIn" value={mentor.linkedInURL ? <a href={mentor.linkedInURL} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">{mentor.linkedInURL}</a> : ''} />
        <InfoRow label="Gender" value={mentor.gender} />
        <InfoRow label="Highest education" value={mentor.highestEducation} />
        <InfoRow label="Work experience" value={mentor.workExperience} />
        <InfoRow label="Current job" value={mentor.currentJob} />
        <InfoRow label="Social links" value={mentor.socialMediaLinks?.length ? mentor.socialMediaLinks.join(', ') : ''} />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Documents / Portfolio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(mentor.documents?.length || 0) > 0 ? (
            mentor.documents.map((d, i) => (
              <a key={i} href={d.url} className="p-3 border rounded-md hover:bg-gray-100" target="_blank" rel="noreferrer">
                <div className="text-sm font-medium">{d.name || 'Document'}</div>
                <div className="text-xs text-gray-500">{d.url}</div>
              </a>
            ))
          ) : (
            <div className="text-sm text-gray-500">No documents uploaded.</div>
          )}
        </div>
      </div>
    </div>
  )
}

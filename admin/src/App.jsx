import './App.css'
import React from 'react';
import Sidebar from './components/SideBar';
import PendingMentors from './pages/PendingMentors';
import MentorDetail from './pages/MentorDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import DummyPage from './pages/DummyPage';
function App() {

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Router>
        <Sidebar />
        <main className="flex-1 p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
          </header>
          <div className="bg-white rounded-lg shadow p-4">
            <Routes>
              <Route path="/" element={<PendingMentors/>} />
              <Route path="/pending-mentors/:id" element={<MentorDetail />} />
              <Route path="/pending/:id" element={<MentorDetail />} />
              <Route path="*" element={<DummyPage/>}/>
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  )
}

export default App

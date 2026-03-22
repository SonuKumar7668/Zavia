import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search, Menu, X, ChevronDown,ChevronUp } from "lucide-react";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [mentorId, setMentorId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const getMentorId = async () => {
      if (role !== "mentor") return;
      const backendURL = import.meta.env.VITE_BACKEND_API || "http://localhost:8080";
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendURL}/mentor/me`, {
        headers: {
          'Authorization': token
        }
      });
      console.log(response.data.mentorId);
      setMentorId(response.data.mentorId);
    }
    getMentorId();
  }, [role])

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target[0].value;
    if (query.trim() === "") return;
    window.location.href = `/explore?search=${encodeURIComponent(query)}`;
  }

  useEffect(() => {
    async function verifyToken() {
      try {
        const token = localStorage.getItem("token");
        const backendURL = import.meta.env.VITE_BACKEND_API;
        const response = await axios.get(`${backendURL}/verifyToken`, {
          headers: {
            'Authorization': token
          }
        })
        console.log(response.data.token);
        if (response.data.token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          localStorage.removeItem("role");
        }
      } catch {
        console.log("not logged in");
        localStorage.clear();
      }
    }
    verifyToken();
  }, []);

  // close mobile menu on navigation (helper)
  const handleNavClick = () => {
    setMobileOpen(false);
  }

  return (
    <header className="top-0 left-0 w-full bg-white shadow z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="https://i.ibb.co/RpYtQM5Y/logo.png" alt="Zavia" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-primary"><Link to="/">Zavia</Link></h1>
        </div>

        {/* Search bar  */}
        <div className="flex-1 flex justify-center">
          <form className="flex" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search mentors..."
              className="hidden md:block border border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="ml-4 hidden md:block cursor-pointer text-primary" aria-label="search">
              <Search />
            </button>
          </form>
        </div>

        {/* Navbar */}
        <nav className="hidden md:flex space-x-6 font-medium items-center">
          <Link to="/" className="hover:text-primary">Home</Link>
          {role !== "mentor" && (
            <Link to="/form" className="hover:text-primary">Onboard</Link>
          )}
          <Link to="/chat" className="hover:text-primary">Chat</Link>
          <Link to="/explore" className="hover:text-primary">Explore</Link>
          <Link to="/jobs" className="hover:text-primary">Jobs</Link>
          {localStorage.getItem("role") === "admin" && <Link to="/admin" className="px-4 py-2 bg-primary text-white rounded-lg">Admin</Link>}
          

          {/* CTA */}
          {isLoggedIn ? <Logout mentorId={mentorId} role={role} /> : <LoggedIn />}
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          {/* mobile search toggle */}
          <button
            onClick={() => setMobileSearchOpen((s) => !s)}
            aria-label="toggle search"
            className="p-2 rounded-full"
          >
            <Search />
          </button>

          {/* mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="toggle menu"
            className="p-2 rounded-full"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile search area */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-4">
          <form className="flex" onSubmit={(e) => { handleSearch(e); setMobileSearchOpen(false); }}>
            <input
              type="search"
              placeholder="Search mentors..."
              className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="ml-2 px-3 py-2 rounded-full border-2 border-primary">Search</button>
          </form>
        </div>
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link to="/" onClick={handleNavClick} className="block">Home</Link>
            {role === "mentor" ? (
              <Link to={`/dashboard/${mentorId}`} onClick={handleNavClick} className="block">Dashboard</Link>
            ) : (
              <Link to="/form" onClick={handleNavClick} className="block">Onboard</Link>
            )}
            <Link to="/chat" onClick={handleNavClick} className="block">Chat</Link>
            <Link to="/explore" onClick={handleNavClick} className="block">Explore</Link>

            <div className="pt-2">
              {isLoggedIn ? (
                <button
                  onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("name"); localStorage.removeItem("role"); window.location.reload(); }}
                  className="w-full text-left border-2 border-primary hover:border-secondary bg-white px-5 py-2 rounded-full shadow"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/register" onClick={handleNavClick} className="block bg-primary text-white px-5 py-2 rounded-full text-center">Register</Link>
                  <Link to="/login" onClick={handleNavClick} className="block border-2 border-primary bg-white px-5 py-2 rounded-full text-center">Login</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;

const LoggedIn = () => {
  return (
    <>
      <Link to="/register" className="hidden md:block bg-primary text-white px-5 py-2 rounded-full shadow hover:bg-secondary">
        Register
      </Link>
      <Link to="/login" className="hidden md:block border-2 border-primary  bg-white px-5 py-2 rounded-full shadow ">
        Login
      </Link>
    </>
  )
}

const Logout = ({ mentorId,role }) => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    window.location.reload();
  }
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Name Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
      >
        <span>{localStorage.getItem("name")}</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-sm">
          <ul className="py-2 text-sm text-gray-600">
            <li>
              <Link
                to="/user/profile"
                className="block px-4 py-2 hover:bg-gray-50 transition"
              >
                Profile
              </Link>
            </li>
            {role === "mentor" && (
            <li>
              <Link
                to={`/dashboard/${mentorId}`}
                className="block px-4 py-2 hover:bg-gray-50 transition"
              >
                Dashboard
              </Link>
            </li>
            )}
            <li>
              <button
                onClick={logout}
                className="w-full bg-amber-300 rounded-lg text-left px-4 py-2 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

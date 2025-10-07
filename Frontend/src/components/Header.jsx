import { Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [mentorId, setMentorId] = useState(null);

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

  useEffect(() => {
    async function verifyToken() {
      try {
      const token = localStorage.getItem("token");
      const backendURL = import.meta.env.VITE_BACKEND_API || "http://localhost:8080";
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
  // const token = localStorage.getItem("token");
  return (
    <header className="top-0 left-0 w-full bg-white shadow z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="https://i.ibb.co/RpYtQM5Y/logo.png" alt="Zavia" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-primary"><Link to="/">Zavia</Link></h1>
        </div>

        {/* Navbar */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          {role === "mentor" ? <Link to={`/dashboard/${mentorId}`} className="hover:text-blue-600">Dashboard</Link> :
            <Link to="/form" className="hover:text-blue-600">Onboard</Link>
          }
          <Link to="/explore" className="hover:text-blue-600">Explore</Link>
          {/* <Link to="#why" className="hover:text-blue-600">Why Us</Link> */}
          {/* <Link to="#stories" className="hover:text-blue-600">Stories</Link> */}

          {/* CTA */}
          {isLoggedIn ? <Logout /> : <LoggedIn />}
        </nav>
      </div>
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

const Logout = () => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    window.location.reload();
  }
  return (
    <button onClick={logout} className="cursor-pointer hidden md:block border-2 border-primary hover:border-secondary  bg-white px-5 py-2 rounded-full shadow ">
      Logout
    </button>
  )
}
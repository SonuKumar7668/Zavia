import {useState, useEffect} from 'react';
import axios from 'axios';
import {User,Briefcase  } from "lucide-react"
import { Link } from 'react-router';
const ExploreSection = () => {

  const [mentors, setMentors] = useState([]);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/");
        setMentors(response.data.mentors);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // const mentors = [
  //   { name: "Rahul Sharma", role: "Frontend Developer @ Google", initials: "RS" },
  //   { name: "Anjali Verma", role: "Data Scientist @ Amazon", initials: "AV" },
  //   { name: "Karan Mehta", role: "Product Manager @ Flipkart", initials: "KM" },
  // ];

  // const jobs = [
  //   { title: "React Developer", company: "Startup · Remote", icon: "⚛" },
  //   { title: "Backend Engineer", company: "Fintech · Bangalore", icon: "⚙" },
  //   { title: "UI/UX Designer", company: "Product Company · Remote", icon: "✦" },
  // ];

  return (
    <section className="bg-background py-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-medium text-primary">
            Explore Opportunities & Mentors
          </h2>
          <p className="mt-3 text-gray-500">
            Connect with experts and discover opportunities tailored for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Mentors */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                Top Mentors
              </h3>
              <button className="text-xs text-primary font-medium hover:underline">
                View all →
              </button>
            </div>
            <hr className="border-gray-100 mb-4" />

            <div className="space-y-3">
              {mentors.map((mentor, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-sm font-medium text-primary flex-shrink-0">
                    <User size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-primary">{mentor.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{mentor.currentJob}</p>
                  </div>
                  <Link to={`/mentor/profile/${mentor._id}`} className="cursor-pointer bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-full hover:opacity-90 whitespace-nowrap">
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Jobs */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-medium uppercase tracking-widest text-gray-400">
                Latest Jobs
              </h3>
              <button className="text-xs text-primary font-medium hover:underline">
                View all →
              </button>
            </div>
            <hr className="border-gray-100 mb-4" />

            <div className="space-y-3">
              {jobs.map((job, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-lg flex-shrink-0">
                    <Briefcase size={16} className='text-primary' />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-primary">{job.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{job.company} · {job.location}</p>
                  </div>
                  <Link to={`/jobs/${job._id}`} className="cursor-pointer bg-secondary text-white text-xs font-medium px-3 py-1.5 rounded-full hover:opacity-90 whitespace-nowrap">
                    Details
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
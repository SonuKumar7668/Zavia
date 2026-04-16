import Header from "./components/Header";
import Footer from "./components/Footer";
import MentorProfile from "./profile/ProfilePage";
import { Routes, Route, useLocation } from "react-router";
import LandingPage from "./landing/LandingPage";
import MentorForm from "./Forms/MentorForm";
import Explore from "./explore/Explore";
import Register from "./register/Register";
import Login from "./register/Login";
// import Landing from "./VideoCall/Landing";
import VideoCall from "./VideoCall/VideoCall";
import { SocketProvider } from "./context/SocketProvider";
import Dashboard from "./dashboard/Dashboard";
import EditDashboard from "./Forms/EditDashboard";
import ForgotPassword from "./register/ForgotPassword";
import FeedbackForm from "./Forms/FeedBackForm";
import Chatbot from "./Chat/ChatBot";
import UserProfile from "./profile/UserProfile";
import EditUserProfile from "./profile/EditUserProfile";
import NotFoundPage from "./NotFound";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ManageJobs from "./admin/ManageJobs";
import ManageUsers from "./admin/ManageUsers";
import AdminRoute from "./components/AdminRoutes";
import CreateJob from "./admin/CreateJob";
import EditJob from "./admin/EditJob";
import JobsExplore from "./job/JobExplore";
import JobDetails from "./job/JobDetails";
import ApplicationsPage from "./job/Applications";
import BecomeRecruiter from "./components/BecomeRecruiter";
import Applications from "./admin/Applications";

function App() {
  const location = useLocation();
  const pathsToHide = ["/videocall", "/chat"];
  const HideHeader = pathsToHide.some(path => location.pathname.startsWith(path));
  return (
    <>

      {!HideHeader && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/mentor/profile/:id" element={<MentorProfile />} />
        <Route path="/mentor/profile/edit/:id" element={<EditDashboard />} />
        <Route path="/form" element={<MentorForm />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/user/profile/:id" element={<UserProfile />} />
        <Route path="/user/profile/edit" element={<EditUserProfile />} />
        <Route path="/videocall/:id" element={
          <SocketProvider>
            <VideoCall />
          </SocketProvider>
        } />
        <Route path="/session/:id/feedback" element={<FeedbackForm />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/jobs" element={<JobsExplore />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/become-recruiter" element={<BecomeRecruiter />} />
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="jobs" element={<ManageJobs />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="jobs/create" element={<CreateJob />} />
          <Route path="jobs/edit/:id" element={<EditJob />} />
          <Route path="jobs/:id/applications" element={<Applications />} />
        </Route>
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!HideHeader && <Footer />}
    </>
  );
}
export default App;

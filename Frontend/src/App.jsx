import Header from "./components/Header";
import Footer from "./components/Footer";
import MentorProfile from "./profile/ProfilePage";
import {Routes,Route,useLocation} from "react-router";
import LandingPage from "./landing/LandingPage";
import MentorForm from "./Forms/MentorForm";
import Explore from "./explore/Explore";
import Register from "./register/Register";
import Login from "./register/Login";
// import Landing from "./VideoCall/Landing";
import VideoCall from "./VideoCall/VideoCall";
import { SocketProvider } from "./context/SocketProvider";


function App() {
  const location = useLocation();
  const hideLayoutRoutes = ["/videocall/:roomId"];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);
  return (
    <>
      <SocketProvider>
      {!shouldHideLayout && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/mentor/profile/:id" element={<MentorProfile/>}/>
        <Route path="/form" element={<MentorForm/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/videocall/:roomId" element={<VideoCall/>}/>
        <Route path="*" element={<h1>404 Not Found</h1>}/>
      </Routes>
      {!shouldHideLayout && <Footer/>}
      </SocketProvider>
    </>
  );
}
export default App;

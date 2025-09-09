import Header from "./components/Header";
import Footer from "./components/Footer";
import MentorProfile from "./profile/ProfilePage";
import {Routes,Route, BrowserRouter} from "react-router";
import LandingPage from "./landing/LandingPage";
import MentorForm from "./Forms/MentorForm";
import Explore from "./explore/Explore";
import Register from "./register/Register";
import Login from "./register/Login";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/mentor/profile/:id" element={<MentorProfile/>}/>
        <Route path="/form" element={<MentorForm/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<h1>404 Not Found</h1>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
export default App;

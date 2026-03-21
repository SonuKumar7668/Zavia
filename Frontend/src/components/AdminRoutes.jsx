// components/AdminRoute.jsx
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  if (!role || role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
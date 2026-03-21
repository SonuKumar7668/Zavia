// admin/AdminLayout.jsx
import { Link, Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/jobs">Manage Jobs</Link>
          <Link to="/admin/users">Manage Users</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import SignUp from "../pages/SignUp";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="" element={<SignUp />} />
        <Route path="login" element={<Login />} />

        {/* Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute admin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* User */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute admin={false}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

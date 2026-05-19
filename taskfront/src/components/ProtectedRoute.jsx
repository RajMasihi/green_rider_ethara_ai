import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, admin }) {
  const token = localStorage.getItem("access");
  const is_admin = JSON.parse(localStorage.getItem("is_admin"));

  // if token not exist
  if (!token) {
    return <Navigate to="/" />;
  }

  // admin route
  if (admin && is_admin) {
    return children;
  }

  // user route
  if (!admin && !is_admin) {
    return children;
  }

  return <Navigate to="/" />;
}

export default ProtectedRoute;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ name }) {
  const [admin, setadmin] = useState(
    localStorage.getItem("is_admin") === "true",
  );
  const navigate = useNavigate();
  const logout = () => {
    if (!confirm("Sure You want to logout")) {
      return;
    }

    localStorage.removeItem("access");

    localStorage.removeItem("refresh");

    navigate("/login");
  };
  console.log("refresh token", localStorage.getItem("refresh"));

  return (
    <header className="p-lg-1 d-flex align-items-center">
      <h4 className="card bg-info-subtle p-2 bordered mb-0 rounded-end-5">
        <span className="bg-black text-light rounded-5 text-center">
          ETHARA AI
        </span>
        {admin ? " AdminDashboard" : "UserDashboard"}
      </h4>
      <div className="flex-grow-1 d-flex justify-content-center">
        <h2 className="text-white mb-0 text-uppercase">
          Welcome <span className="text-light-emphasis">{name}</span>
        </h2>
      </div>
      <p className="m-3 btn btn-danger" onClick={() => logout()}>
        Logout
      </p>
    </header>
  );
}

export default Header;

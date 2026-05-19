import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [message, setmessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("login/", formData);

      console.log(response.data);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("is_admin", response.data.is_admin);

      if (response.data.is_admin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      setmessage("Invalid Credentials");
      setInterval(() => {
        setmessage("");
      }, 3000);
    }
  };

  return (
    <div className="card p-lg-5   justify-content-center align-items-center">
      <div className="card-header text-center w-50 bg-dark-subtle">
        <h1 className="rounded-5">ETHARA AI</h1>
      </div>

      <form onSubmit={handleSubmit} className="box w-50 p-3 bg-primary-subtle">
        <h3 className="text-center bg-body-secondary p-1">Login</h3>
        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <br />
        <br />
        <p className="text-danger text-center"> {message}</p>
        <div className="form-group d-flex justify-content-center p-lg-3">
          <a href="/" className="m-3 text-decoration-none">
            Signup
          </a>
          <button
            type="submit"
            className="btn btn-primary btn-outline-success w-50  text-light btn-lg"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

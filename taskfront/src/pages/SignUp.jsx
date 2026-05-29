import React, { useState } from "react";
import api from "../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [SignUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
    is_admin: false,
  });
  const [message, setmessage] = useState("");
  const [Errors, setErrors] = useState({});
  const handlechange = (e) => {
    const { name, value, type, checked } = e.target;

    setSignUpFormData({
      ...SignUpFormData,

      [name]: type === "checkbox" ? checked : value,
    });
  };
  const SubmitForm = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post(
      //   // "http://127.0.0.1:8000/api/signup/",
      //   `${import.meta.env.VITE_API_URL}/signup/`,
      //   SignUpFormData,
      // );
      const response = await api.post("/signup/", SignUpFormData);
      setmessage(response.data.message);
      setTimeout(() => {
        setmessage("");

        navigate("/login");
      }, 4000);
    } catch (err) {
      if (err.response?.data) {
        const errors = err.response.data;
        console.log(errors);
        setErrors(errors);
      } else {
        alert("Something wrong");
      }
    }
  };
  return (
    <div className="card p-lg-5   justify-content-center align-items-center">
      <div className="card-header text-center w-50 bg-dark-subtle">
        <h1 className="rounded-5">ETHARA AI</h1>
      </div>

      <form onSubmit={SubmitForm} className="box w-50 p-3 bg-primary-subtle">
        <h3 className="text-center bg-body-secondary p-1">Create Account</h3>
        {message ? <p className="bg-success p-2">{message}</p> : null}
        <div className="form-group p-lg-3">
          <label htmlFor="title" className="p-1">
            Full Name :
          </label>
          <input
            type="text"
            name="name"
            className="form-control p-lg-3"
            id="name"
            placeholder="Enter your name"
            onChange={handlechange}
          />
          {Errors.name && <p className="text-danger">{Errors.name[0]}</p>}
        </div>
        <div className="form-group p-lg-3">
          <label htmlFor="title" className="p-1">
            Email :
          </label>
          <input
            type="email"
            name="email"
            className="form-control p-lg-3"
            id="name"
            placeholder="Enter your email"
            onChange={handlechange}
          />
          {Errors.email && <p className="text-danger">{Errors.email[0]}</p>}
        </div>
        <div className="form-group p-lg-3">
          <label htmlFor="title" className="p-1">
            Password :
          </label>
          <input
            type="password"
            name="password"
            className="form-control p-lg-3"
            id="name"
            placeholder="Enter your password"
            onChange={handlechange}
          />
          {Errors.password && (
            <p className="text-danger">{Errors.password[0]}</p>
          )}
        </div>{" "}
        <div className="form-check ms-3">
          <input
            type="checkbox"
            name="is_admin"
            className="form-check-input"
            id="is_admin"
            onChange={handlechange}
          />

          <label className="form-check-label" htmlFor="is_admin">
            Is Admin
          </label>
        </div>
        <div className="form-group d-flex justify-content-center p-lg-3">
          <a href="/Login" className="m-3 text-decoration-none">
            Login
          </a>
          <button
            type="submit"
            className="btn btn-primary btn-outline-success  text-light btn-lg"
          >
            Submit Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

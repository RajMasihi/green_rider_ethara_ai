import React, { useState } from "react";
import api from "../api/axios";

function CreateProject({ project_created, show_projects }) {
  const [formdata, setformdata] = useState({ name: " ", description: " " });
  const [message, setmessage] = useState("");
  const [errormes, seterrormes] = useState("");
  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const projectSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("projects/", formdata);
      setmessage("Project created successfully");

      setTimeout(() => {
        setmessage("");
        project_created(true);
        show_projects({ dContent: "allprojects" });
      }, 4000);
    } catch (err) {
      seterrormes(err.response.data.name_error);
      setTimeout(() => {
        seterrormes("");
      }, 4000);
    }
  };
  return (
    <div className="card p-lg-5  d-flex justify-content-center align-items-center">
      <form onSubmit={projectSubmit} className="box w-50 p-3 bg-primary-subtle">
        <div className=" text-center bg-info-subtle p-1">
          <h3>Create project</h3>
          {message && <div className="alert p-1 alert-success">-{message}</div>}
          {errormes && (
            <div className="alert p-1 alert-danger">-{errormes}</div>
          )}
        </div>
        <div className="form-group p-lg-3">
          <label for="project_name">Project Name :</label>
          <input
            type="text"
            name="name"
            className="form-control p-lg-3"
            id="project_name"
            aria-describedby="emailHelp"
            placeholder="Enter project name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-lg-3">
          <label for="description">Description :</label>
          <textarea
            class="form-control"
            name="description"
            id="description"
            rows="3"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group d-flex justify-content-center p-lg-3">
          <button
            type="submit"
            className="btn btn-primary btn-outline-success  text-light btn-lg"
          >
            Create Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;

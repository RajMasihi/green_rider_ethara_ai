import React, { useState } from "react";

import api from "../api/axios";

function CreateTask({ pdata, project_id, task_created }) {
  const [TaskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    project_task: project_id,
    assign_to: "",
    priority: "MEDIUM",
    due_date: "",
  });
  const [message, setmessage] = useState("");
  const [Errors, setErrors] = useState({});
  const handlechange = (e) => {
    setTaskFormData({ ...TaskFormData, [e.target.name]: e.target.value });
  };
  const SubmitForm = async (e) => {
    e.preventDefault();
    const sendData = {
      ...TaskFormData,

      assign_to: TaskFormData.assign_to === "" ? null : TaskFormData.assign_to,
    };
    try {
      const response = await api.post("tasks/", TaskFormData);
      setmessage("task create successfull");
      setTimeout(() => {
        setmessage("");
        task_created({ pContent: "projecttasks", pVal: true });
      }, 4000);
    } catch (err) {
      if (err.response?.data) {
        const errors = err.response.data;
        setErrors(err.response.data);
      } else {
        console.log("Something went wrong");
      }
    }
  };
  return (
    <div className="card p-lg-5  d-flex justify-content-center align-items-center">
      <form
        className="box w-50 p-3 bg-primary-subtle text-start"
        onSubmit={SubmitForm}
      >
        <h3 className="bg-info p-2 text-center">Create Task</h3>
        {message && <p className="bg-success p-2">{message}</p>}
        <div className="form-group p-lg-3">
          <label for="title" className="p-1">
            Task title :
          </label>
          <input
            type="text"
            name="title"
            className="form-control p-lg-3"
            id="title"
            placeholder="Enter task title"
            onChange={handlechange}
          />
          {Errors.title && <p className="text-danger">{Errors.title[0]}</p>}
        </div>
        <div className="form-group p-lg-3">
          <label for="description">Description :</label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            placeholder="Enter task details"
            rows="3"
            onChange={handlechange}
          ></textarea>
          {Errors.description && (
            <p className="text-danger">{Errors.description[0]}</p>
          )}
        </div>
        <div className="form-group p-lg-3">
          <label for="assign_user" className="p-1">
            Assign To
          </label>
          <select
            className="form-select"
            name="assign_to"
            onChange={handlechange}
          >
            <option>Select memeber</option>
            {pdata.map((val) => (
              <option value={val.member_details.id} key={val.member_details.id}>
                {val.member_details.name}--{val.member_details.email}
              </option>
            ))}
          </select>
          {Errors.assign_to && (
            <p className="text-danger">{Errors.assign_to[0]}</p>
          )}
        </div>
        <div className="form-group p-lg-3">
          <label for="priority" className="p-1">
            Priority
          </label>
          <select
            className="form-select"
            name="priority"
            onChange={handlechange}
          >
            <option value="">select default Midium</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
            <option value="HIGH">HIGH</option>
          </select>
          {Errors.priority && (
            <p className="text-danger">{Errors.priority[0]}</p>
          )}
        </div>
        <div className="form-group p-lg-3">
          <label for="due_date" className="p-1">
            Due date :
          </label>
          <input
            type="date"
            name="due_date"
            className="form-control p-lg-3"
            id="due_date"
            placeholder="Enter Due date"
            onChange={handlechange}
          />
          {Errors.due_date && (
            <p className="text-danger">{Errors.due_date[0]}</p>
          )}
        </div>
        <div className="form-group d-flex justify-content-center p-lg-3">
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

export default CreateTask;

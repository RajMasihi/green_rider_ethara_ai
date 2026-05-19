import React, { useEffect, useState } from "react";
import api from "../api/axios";

function EditTask({ Task, project_id, btnclick, setEditForm }) {
  const [TaskFormData, setTaskFormData] = useState({
    description: Task.description,
    assign_to: Task.assign_to,
    priority: Task.priority,
    due_date: Task.due_date,
  });
  const [message, setmessage] = useState("");
  const [Errors, setErrors] = useState({});
  const [Members, setMembers] = useState([]);
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
      const response = await api.patch(`tasks/${Task.id}/`, TaskFormData);
      setmessage("task create successfull");
      setTimeout(() => {
        setmessage("");
        setEditForm(false);
      }, 4000);

      //   btnclick({ pContent: "projecttasks", pVal: true });
    } catch (err) {
      console.log(err.response.data);
      console.log(err);

      console.log(err.response);
      if (err.response?.data) {
        const errors = err.response.data;
        setErrors(err.response.data);
        console.log("errores in this ", errors);
      } else {
        console.log("Something went wrong");
      }
    }
  };

  useEffect(() => {
    const membersdata = async () => {
      try {
        const response = await api.get(`members/?project_id=${project_id}`);
        setMembers(response.data);
        console.log("memeber", response.data);
      } catch (err) {
        alert("members data not fetched");
      }
    };
    membersdata();
  }, []);

  return (
    <div className="p-lg-5 justify-content-center align-items-center">
      <h3 className="bg-info p-2">
        Edit Task <br />
        <span className="text-white p-1">{Task.title}</span>
      </h3>

      {message && <p className="bg-success p-2">{message}</p>}
      <form className="text-start" onSubmit={SubmitForm}>
        <div className="form-group p-lg-3">
          <label for="description">Description :</label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            rows="3"
            value={TaskFormData.description}
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
            // value={
            //   Task.assign_to === ""
            //     ? "please add member"
            //     : TaskFormData.assign_to
            // }
            onChange={handlechange}
          >
            {Task.assign_to === "" ? (
              <option value="">please add member</option>
            ) : (
              <option>{TaskFormData.assign_to}</option>
            )}
            {Members.map((val) => (
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
            <option value={Task.priority}>{Task.priority}</option>
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
            value={TaskFormData.due_date}
            className="form-control p-lg-3"
            id="due_date"
            placeholder="Enter Due date"
            onChange={handlechange}
          />
          {Errors.non_field_errors && (
            <p className="text-danger">{Errors.non_field_errors[0]}</p>
          )}
        </div>
        <div className="form-group d-flex justify-content-center p-lg-3">
          <button
            type="submit"
            className="btn btn-primary btn-outline-success  text-light btn-lg"
          >
            Update Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;

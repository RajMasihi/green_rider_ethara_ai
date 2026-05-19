import React, { useEffect, useState } from "react";
import api from "../api/axios";

function UserViewTask({ task_data, condition }) {
  const [task_state, settask_state] = useState([]);

  useEffect(() => {
    settask_state(task_data);
  }, [task_data]);

  const over_due_compare = (over_due_date) => {
    const today = new Date();
    const due = new Date(over_due_date);

    if (today > due) {
      return true;
    }
  };
  const update_status = async (id, statusval) => {
    if (!confirm("are you sure want to change status : " + statusval)) {
      return;
    }
    try {
      const response = await api.patch(`taskretrieveupdate/${id}/`, {
        status: statusval,
      });

      settask_state((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                status: statusval,
              }
            : task,
        ),
      );
    } catch (err) {
      console.log("status update error", err.response.data);
      alert("status not updated", err.response.data);
    }
  };
  return (
    <>
      <h3 className="text-center text-capitalize border p-2 border-black rounded-5">
        {task_state[0]?.project_name}
      </h3>
      {task_state?.map((val) => (
        <div key={val.id} className="card mt-3  text-center bg-body-secondary">
          <p className="card-header text-capitalize bg-info-subtle">
            {val.title}
          </p>

          <p className="card-body">Descriptions: {val.description}</p>

          <div className="card-footer d-flex flex-wrap justify-content-between">
            {" "}
            <p
              className={`p-3 h-50 btn border-1 rounded-5  ${over_due_compare(val.due_date) ? "text-danger border-danger" : " border-black"}`}
            >
              Due date : {val.due_date}
              <hr />
              {over_due_compare(val.due_date) ? "Over Due" : null}
            </p>
            <p className="">Priority : {val.priority}</p>
            <p
              className={`p-3 h-25 btn border-1 rounded-5  ${val.status === "DONE" ? "text-success border-success" : "border-black"}`}
            >
              {" "}
              Status : {val.status}
              <hr />
              {val.status === "TODO" ? (
                <button
                  className="btn btn-outline-info rounded-5"
                  onClick={() => update_status(val.id, "IN_PROGRESS")}
                >
                  Update into In Progress
                </button>
              ) : val.status === "IN_PROGRESS" ? (
                <button
                  className="btn btn-outline-success  rounded-5"
                  onClick={() => update_status(val.id, "DONE")}
                >
                  Update into DONE
                </button>
              ) : null}
              {val.completed_at ? val.completed_at : null}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default UserViewTask;

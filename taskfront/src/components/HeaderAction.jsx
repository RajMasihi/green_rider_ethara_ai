import React, { useEffect, useState } from "react";
import api from "../api/axios";

function HeaderAction({ getdata, projectcount, taskcount }) {
  return (
    <div className="card border-info-subtle border-3 p-2">
      <div className="d-flex flex-wrap justify-content-center gap-2">
        <button
          className="btn btn-outline-primary btn-lg"
          onClick={() => getdata({ dContent: "allprojects" })}
        >
          All Projects : {projectcount}
        </button>

        <button
          className="btn btn-outline-primary btn-lg"
          onClick={() => getdata({ dContent: "alltasks" })}
        >
          All Tasks :{taskcount}
        </button>

        <button
          className="btn btn-outline-primary btn-lg"
          onClick={() => getdata({ dContent: "taskuser" })}
        >
          All Tasks per User
        </button>

        <button
          className="btn btn-outline-primary btn-lg"
          onClick={() => getdata({ dContent: "status" })}
        >
          All Task by Status
        </button>

        <button
          className="btn btn-outline-danger btn-lg"
          onClick={() => getdata({ dContent: "overdue" })}
        >
          All Overdue Tasks
        </button>

        <button
          className="btn btn-outline-success btn-lg"
          onClick={() => getdata({ dContent: "createproject" })}
        >
          Create Project
        </button>
      </div>
    </div>
  );
}

export default HeaderAction;

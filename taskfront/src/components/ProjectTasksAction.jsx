import React from "react";

function ProjectTasksAction({ Counts, btnclick }) {
  return (
    <div className="d-flex bg-dark-subtle justify-content-around p-1">
      <button
        className="btn btn-outline-dark"
        onClick={() => btnclick({ pContent: "projecttasks", Pval: false })}
      >
        Project Tasks-<span>{Counts.tasks}</span>
      </button>
      <button
        className="btn btn-outline-dark"
        onClick={() => btnclick({ pContent: "projectmembers", Pval: false })}
      >
        Project Members-<span>{Counts.members}</span>
      </button>

      <button
        className="btn btn-outline-dark"
        onClick={() => btnclick({ pContent: "createtask", Pval: false })}
      >
        Create Task
      </button>
    </div>
  );
}

export default ProjectTasksAction;

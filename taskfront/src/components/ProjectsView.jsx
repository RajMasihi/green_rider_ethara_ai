import React, { useEffect, useMemo, useState } from "react";
import UserViewTask from "./UserViewTask";
function ProjectsView({ projects, tasks }) {
  const [TaskCount, setTaskCount] = useState({});
  const [task_data, settask_data] = useState({});
  const [Show_data, setShow_data] = useState(false);

  console.log("task", tasks);
  const group_task = useMemo(() => {
    const group = tasks.reduce((acc, item) => {
      if (!acc[item.project_task]) {
        acc[item.project_task] = [];
      }
      acc[item.project_task].push(item);
      return acc;
    }, {});

    setTaskCount(group);
    return group;
  }, [tasks]);

  const ShowData = (project_id) => {
    settask_data(group_task?.[Number(project_id)] || []);

    console.log("goup_task", group_task);
    setShow_data(true);
  };

  return (
    <div className="row">
      <div
        className="col-lg-3"
        style={{ maxHeight: "550px", overflowY: "auto" }}
      >
        {projects.map((val) => (
          <div
            onClick={() => ShowData(val.project)}
            key={val.project}
            className=" text-center m-2 btn w-100 bg-info-subtle border border-black"
          >
            <h3 className="card-title m-1 text-capitalize">
              {val.project_name}
            </h3>
            <hr />
            <h6>
              {" "}
              Total-Tasks :{" "}
              {TaskCount[val.project] ? TaskCount[val.project]?.length : 0}{" "}
            </h6>
            <p className="rounded-5 bg-success-subtle text-center m-2 border border-dark">
              Join at : {new Date(val.join_at).toLocaleString()}{" "}
            </p>
          </div>
        ))}
      </div>
      <div
        className="col-lg-9"
        style={{ maxHeight: "550px", overflowY: "auto" }}
      >
        {Show_data ? (
          <UserViewTask task_data={task_data} />
        ) : (
          <h4 className="card bg-info-subtle p-2 text-center text-capitalize">
            please click left side any project and see details
          </h4>
        )}
      </div>
    </div>
  );
}

export default ProjectsView;

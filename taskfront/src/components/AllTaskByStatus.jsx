import React, { useEffect, useState } from "react";
import TaskTable from "./TaskTable";

function AllTaskByStatus({ AllTasksData }) {
  const [StatusData, setStatusData] = useState([]);
  const [status, setstatus] = useState("TODO");
  console.log(AllTasksData);
  useEffect(() => {
    const group_status = AllTasksData.reduce((acc, item) => {
      if (!acc[item.status]) {
        acc[item.status] = [];
      }

      acc[item.status].push(item);

      return acc;
    }, {});
    console.log("status group", group_status);
    setStatusData(group_status);
  }, []);

  return (
    <div>
      <div className="bg-secondary-subtle d-flex  d-grid flex-wrap gap-lg-5 p-1 justify-content-center">
        {Object.keys(StatusData).map((key) => (
          <button
            className="btn btn-outline-dark p-2"
            key={key}
            onClick={() => setstatus(key)}
          >
            {key} :<span> {StatusData[key].length}</span>
          </button>
        ))}
      </div>
      <TaskTable task_data={StatusData[status]} />
    </div>
  );
}

export default AllTaskByStatus;

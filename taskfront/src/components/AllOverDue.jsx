import React, { useEffect, useState } from "react";
import { data } from "react-router-dom";
import TaskTable from "./TaskTable";

function AllOverDue({ AllTasksData }) {
  const [Overdue, setOverdue] = useState([]);
  useEffect(() => {
    const overduedata = AllTasksData.filter(
      (val) => new Date(val.due_date) < new Date(),
    );
    setOverdue(overduedata);
    console.log("overdue", overduedata);
  }, []);

  return (
    <div>
      <h1 className="card bg-secondary-subtle p-1 text-center">
        All overdue tasks
      </h1>
      <TaskTable task_data={Overdue} />
    </div>
  );
}

export default AllOverDue;

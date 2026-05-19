import React, { useEffect, useState } from "react";
import api from "../api/axios";
import TaskTable from "./TaskTable";

function AllTasks({ AllTasksData }) {
  const over_due_compare = (over_due_date) => {
    const today = new Date();
    const due = new Date(over_due_date);

    if (today > due) {
      return true;
    }
  };

  return (
    <div>
      <h1 className="card bg-secondary-subtle p-1 text-center">All Tasks</h1>
      <TaskTable task_data={AllTasksData} />
    </div>
  );
}

export default AllTasks;

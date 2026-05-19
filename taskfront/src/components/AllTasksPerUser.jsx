import React, { useEffect, useState } from "react";
import api from "../api/axios";
import TaskTable from "./TaskTable";

function AllTasksPerUser({ AllTasksData }) {
  const [GroupData, setGroupData] = useState([]);

  const Taskcountuser = Object.values(
    AllTasksData.reduce((acc, task) => {
      if (!task.member_assignt_details) return acc;

      const user = task.member_assignt_details;

      if (!acc[user.id]) {
        acc[user.id] = {
          ...user,
          taskCount: 1,
        };
      } else {
        acc[user.id].taskCount += 1;
      }

      return acc;
    }, {}),
  );

  const grouped = AllTasksData.reduce((acc, item) => {
    if (!acc[item.assign_to]) {
      acc[item.assign_to] = [];
    }

    acc[item.assign_to].push(item);

    return acc;
  }, {});

  const GetGroup = (id, grouped) => {
    const valarr = grouped[id];

    return valarr;
  };

  const over_due_compare = (over_due_date) => {
    const today = new Date();
    const due = new Date(over_due_date);

    if (today > due) {
      return true;
    }
  };
  const ShowData = async (id) => {
    const data = await GetGroup(id.user_id, grouped);
    setGroupData(data);
  };
  return (
    <div className="row">
      <div
        className="col-lg-3"
        style={{ maxHeight: "550px", overflowY: "auto" }}
      >
        {Taskcountuser.map((val) => (
          <div
            onClick={() => ShowData({ user_id: val.id })}
            key={val.id}
            className="p-1 text-center m-2 btn btn-outline-info w-100 btn-secondary text-light"
          >
            <h4>Name: {val.name}</h4>
            <p>Email: {val.email}</p>
            <hr />
            <h5>total tasks: {val.taskCount}</h5>
          </div>
        ))}
      </div>
      <div
        className="col-lg-9"
        style={{ maxHeight: "550px", overflowY: "auto" }}
      >
        <TaskTable task_data={GroupData} />
      </div>
    </div>
  );
}

export default AllTasksPerUser;

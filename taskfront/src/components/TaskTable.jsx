import React from "react";

function TaskTable({ task_data }) {
  const Delete_task = async (data) => {
    try {
      const response = await api.delete(`tasks/${data.task_id}/`);
      setProjectTasks((prev) =>
        prev.filter((item) => item.id !== data.task_id),
      );
    } catch (err) {
      console.log("task not delted", err.response.data);
      alert("taks not deleted");
    }
  };
  const over_due_compare = (over_due_date) => {
    const today = new Date();
    const due = new Date(over_due_date);

    if (today > due) {
      return true;
    }
  };
  return (
    <div style={{ maxHeight: "550px", overflowY: "auto" }}>
      <table className="table table-responsive table-bordered align-content-center text-center text-capitalize table-striped">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Description </th>
            <th>Assigned To</th>

            <th>Priority</th>
            <th>Created At</th>
            <th> Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {task_data?.map((val) => (
            <tr
              key={val.id}
              className={val.status === "DONE" ? "table-success" : ""}
            >
              <td className="w-25 offcanvas-title">{val.title}</td>
              <td>{val.description}</td>
              <td>
                {val.assign_to == null ? (
                  <p className="text-danger">plese add member</p>
                ) : (
                  val.member_assignt_details?.name
                )}
              </td>

              <td>{val.priority}</td>

              <td>{new Date(val.created_at).toLocaleString()}</td>

              <td>
                <p>{val.due_date}</p>

                {over_due_compare(val.due_date) ? (
                  <div>
                    <p className="bg-danger">Over Due</p>
                  </div>
                ) : null}
              </td>
              <td>
                {val.status}
                {val.completed_at ? (
                  <p>{new Date(val.completed_at).toLocaleString()}</p>
                ) : (
                  ""
                )}
              </td>
              <td className="">
                {val.status !== "DONE" ? (
                  <button
                    className="btn btn-outline-info w-100 m-1"
                    onClick={() => {
                      handleEditbtn({ values: val });
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  ""
                )}
                <button
                  className="btn btn-outline-danger text-center w-100 m-1"
                  onClick={() =>
                    Delete_task({
                      task_id: val.id,
                    })
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;

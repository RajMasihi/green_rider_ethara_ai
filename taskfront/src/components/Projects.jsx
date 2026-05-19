import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Projects({ AllProjects, projctviewactionbtn }) {
  const [values, setvalues] = useState([]);
  const [error, seterror] = useState();
  const [projctviewaction, setprojctviewactionbtn] = useState();
  // useEffect(() => {
  //   const projectdetails = async () => {
  //     try {
  //       const response = await api.get("projects/");
  //       console.log(response.data);
  //       setvalues(response.data);
  //     } catch (err) {
  //       setvalues("some thing errors" + err);
  //     }
  //   };
  //   projectdetails();
  // }, []);

  return (
    <div className="card p-1">
      {projctviewaction ? (
        <h1>project view action clicked with - {projctviewaction}</h1>
      ) : (
        <h1 className="card bg-secondary-subtle p-1 text-center">
          All Projects
        </h1>
      )}
      <table className="table table-responsive table-bordered align-content-center text-center text-capitalize table-striped">
        <thead className="table-dark sticky-top">
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Created at</th>
            <td>View and Actions</td>
          </tr>
        </thead>
        <tbody className="">
          {AllProjects.map((val) => (
            <tr key={val.id}>
              <td>{val.name}</td>
              <td className="w-25">{val.description}</td>
              <td>{val.create_at}</td>
              <td>
                <button
                  key={val.id}
                  className="btn btn-secondary btn-outline-success text-light w-100 align-middle"
                  onClick={() =>
                    projctviewactionbtn({
                      dContent: "projectviewaction",
                      BtnVal: val.id,
                    })
                  }
                >
                  Click
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Projects;

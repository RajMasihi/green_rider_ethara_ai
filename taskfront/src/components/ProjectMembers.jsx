import React, { useEffect, useState } from "react";
import api from "../api/axios";
import AddMembers from "./AddMembers";

function ProjectMembers({ project_id, btnclick }) {
  const [MembersData, setMembersData] = useState([]);
  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await api.get(`members/?project_id=${project_id}`);
        setMembersData(response.data);
        console.log(response.data);
      } catch (err) {
        alert("some things error");
      }
    };
    getMembers();
  }, []);
  const handle_members = (data) => {
    setMembersData([...MembersData, data]);
  };
  const remove_member = async (data) => {
    try {
      const response = await api.delete(`members/${data.id}/`);
      setMembersData((prev) => prev.filter((item) => item.id !== data.id));
    } catch (err) {
      console.log("remove not error", err.response.data);
      alert("data not deleted" + err.response.data);
    }
  };

  return (
    <div className="row">
      <AddMembers project_id={project_id} update_member_list={handle_members} />
      <div className="col-lg-7">
        <h4 className="bg-info-subtle p-1">Project Members</h4>
        <table className="table table-responsive table-bordered align-content-center text-center text-capitalize table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Join at</th>
              <th>Remove from project</th>
            </tr>
          </thead>
          <tbody>
            {MembersData?.map((val) => (
              <tr key={val.id}>
                <td className="w-25">{val.member_details.name}</td>
                <td>{val.member_details.email}</td>

                <td>{new Date(val.join_at).toLocaleString()}</td>

                <td className="">
                  <button
                    className="btn btn-outline-danger w-100 m-1"
                    onClick={() => remove_member({ id: val.id })}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectMembers;

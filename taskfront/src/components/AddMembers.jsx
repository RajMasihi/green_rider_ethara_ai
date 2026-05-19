import React, { useEffect, useState } from "react";
import api from "../api/axios";

function AddMembers({ project_id, update_member_list, remove_member }) {
  const [Userdata, setUserdata] = useState([]);
  const [Members, setMembers] = useState([]);
  const [FilteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const response = await api.get("alluserinfo/");
        console.log("all users data", response.data);
        setUserdata(response.data);
      } catch (err) {
        console.log("get user failed");
      }
    };
    getUsersData();
  }, []);

  useEffect(() => {
    const getmembers = async () => {
      try {
        const response = await api.get(`members/?project_id=${project_id}`);
        setMembers(response.data);
      } catch (err) {
        console.log("error in get members");
      }
    };
    getmembers();
  }, []);

  useEffect(() => {
    const nonCommonUsers = Userdata.filter(
      (user) => !Members.some((member) => member.user_member === user.id),
    );

    setFilteredUsers(nonCommonUsers);

    console.log("filtered users", nonCommonUsers);
  }, [Members]);

  const add_member = async ({ project_id, user_id }) => {
    try {
      const response = await api.post("members/", {
        project: project_id,
        user_member: user_id,
      });
      setMembers([...Members, response.data]);
      update_member_list(response.data);
    } catch {
      console.log("data added successfull", response.data);
    }
  };

  return (
    <div className="col-lg-5">
      <h4 className="p-1 bg-info-subtle">Add Member</h4>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-responsive table-bordered align-content-center text-center text-capitalize table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Add into Project</th>
            </tr>
          </thead>
          <tbody>
            {FilteredUsers?.map((val) => (
              <tr key={val.id}>
                <td className="w-25">{val.name}</td>
                <td>{val.email}</td>

                <td className="">
                  <button
                    className="btn btn-outline-success w-100 m-1"
                    onClick={() =>
                      add_member({ project_id: project_id, user_id: val.id })
                    }
                  >
                    Add
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

export default AddMembers;

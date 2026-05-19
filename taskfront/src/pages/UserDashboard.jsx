import { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api/axios";
import ProjectsView from "../components/ProjectsView";
import UserViewTask from "../components/UserViewTask";

function UserDashboard() {
  const [userinfo, setuserinfo] = useState([]);
  const [Content, setContent] = useState(true);
  const [error, seterror] = useState();
  const [Projects, setProjects] = useState([]);
  const [Tasks, setTasks] = useState([]);

  useEffect(() => {
    const userinformation = async () => {
      try {
        const response = await api.get("userinfo/");
        setuserinfo(response.data);
      } catch (err) {
        seterror("Failed to user information ");
      }
    };
    userinformation();
  }, []);

  useEffect(() => {
    const getporjects = async () => {
      try {
        const response = await api.get("projectlistmember/");
        console.log("projects", response.data);
        setProjects(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getporjects();
  }, []);

  useEffect(() => {
    const gettasks = async () => {
      try {
        const response = await api.get("tasklist/");
        console.log("tasks", response.data);
        setTasks(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    gettasks();
  }, []);

  return (
    <>
      <Header name={userinfo.name} />
      <div className="d-flex flex-wrap justify-content-center gap-2 p-3 bg-secondary-subtle">
        <button
          className="btn btn-outline-info btn-lg"
          onClick={() => setContent(true)}
        >
          Projects : {Projects.length}
        </button>
        <button
          className="btn btn-outline-info btn-lg"
          onClick={() => setContent(false)}
        >
          All Task : {Tasks.length}
        </button>
      </div>
      {Content ? (
        <ProjectsView projects={Projects} tasks={Tasks} />
      ) : (
        <UserViewTask task_data={Tasks} condition={true} />
      )}
    </>
  );
}

export default UserDashboard;

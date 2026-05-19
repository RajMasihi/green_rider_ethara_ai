import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CreateProject from "../components/CreateProject";
import api from "../api/axios";
import Button from "../components/Button";
import HeaderAction from "../components/HeaderAction";
import Projects from "../components/Projects";
import ProjectViewAction from "../components/ProjectViewAction";
import AllTasks from "../components/AllTasks";
import AllTasksPerUser from "../components/AllTasksPerUser";
import AllTaskByStatus from "../components/AllTaskByStatus";
import AllOverDue from "../components/AllOverDue";

function AdminDashboard() {
  const [userinfo, setuserinfo] = useState([]);
  const [AllTasksData, setAllTasksData] = useState([]);
  const [ActionBtn, setActionBtn] = useState({
    type: "",
    data: "",
  });
  const [error, seterror] = useState();
  const [taskcount, settaskcount] = useState(0);
  const [projectcount, setprojectcount] = useState(0);
  const [AllProjects, setAllProjects] = useState([]);

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
    const GetAllTasks = async () => {
      try {
        const response = await api.get("tasks/");
        setAllTasksData(response.data);
        console.log(response.data);
      } catch (err) {
        alert("all tasks not fetched");
      }
    };
    GetAllTasks();
  }, []);

  useEffect(() => {
    const total_task = async () => {
      try {
        let response = await api.get("tasks/");
        console.log(response.data);
        settaskcount(response.data.length);
      } catch (err) {
        console.log("total task error" + err);
      }
    };
    total_task();
  }, []);
  useEffect(() => {
    const total_projects = async () => {
      try {
        let response = await api.get("projects/");
        console.log(response.data);
        setprojectcount(response.data.length);
        setAllProjects(response.data);
      } catch (err) {
        console.log("total task error" + err);
      }
    };
    total_projects();
  }, [projectcount]);

  const handle_header_btn = (val) => {
    setActionBtn({ type: val.dContent, data: val.BtnVal });
  };
  const handle_project_created = (data) => {
    if (data) {
      setprojectcount(projectcount + 1);
    }
  };

  return (
    <>
      <Header name={userinfo.name} />
      <HeaderAction
        getdata={handle_header_btn}
        projectcount={projectcount}
        taskcount={taskcount}
      />
      {ActionBtn.type === "allprojects" ? (
        <Projects
          AllProjects={AllProjects}
          projctviewactionbtn={handle_header_btn}
        />
      ) : ActionBtn.type === "alltasks" ? (
        <AllTasks AllTasksData={AllTasksData} />
      ) : ActionBtn.type === "taskuser" ? (
        <AllTasksPerUser AllTasksData={AllTasksData} />
      ) : ActionBtn.type === "status" ? (
        <AllTaskByStatus AllTasksData={AllTasksData} />
      ) : ActionBtn.type === "overdue" ? (
        <AllOverDue AllTasksData={AllTasksData} />
      ) : ActionBtn.type === "createproject" ? (
        <CreateProject
          project_created={handle_project_created}
          show_projects={handle_header_btn}
        />
      ) : ActionBtn.type === "projectviewaction" ? (
        <ProjectViewAction value={ActionBtn.data} />
      ) : null}
    </>
  );
}

export default AdminDashboard;

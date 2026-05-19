import React, { useState, useEffect } from "react";
import api from "../api/axios";
import ProjectTasksAction from "./ProjectTasksAction";
import ProjectTasksTable from "./ProjectTasksTable";
import CreateTask from "./CreateTask";
import ProjectMembers from "./ProjectMembers";

function ProjectViewAction({ value }) {
  const [Message, setMessage] = useState();
  const [Projectvalues, setProjectvalues] = useState({});
  const [Membersvalue, setMembersvalues] = useState();
  const [ProjectTasks, setProjectTasks] = useState();
  const [Countsval, setCountsval] = useState({
    tasks: "0",
    members: "0",
  });
  const [ProjectContent, setProjectContent] = useState({
    pConType: " ",
  });

  useEffect(() => {
    const projectdata = async () => {
      try {
        const [ProjectRes, MembersRes, TasksRes] = await Promise.all([
          api.get(`projects/${value}/`),
          api.get(`members/?project_id=${value}`),
          api.get(`tasks/?project_id=${value}`),
        ]);
        setProjectvalues(ProjectRes.data);
        setMembersvalues(MembersRes.data);
        setProjectTasks(TasksRes.data);
        setCountsval({
          tasks: TasksRes.data.length,
          members: MembersRes.data.length,
        });
        // console.log(MembersRes.data);
        // console.log(ProjectTasksRes.data);
        // console.log(TasksRes.data);
      } catch (errors) {
        console.log(errors);
        setMessage("some errors please check");
      }
    };
    projectdata();
  }, []);

  const handlclick = (val) => {
    if (val.pContent && val.pVal === true) {
      setCountsval((prev) => ({
        ...prev,
        tasks: prev.tasks + 1,
      }));
    }
    setProjectContent({ pConType: val.pContent });
  };

  return (
    <div className="card p-1 bg-body-secondary  border-primary text-center">
      <div className="card-header text-center bg-secondary-subtle  text-capitalize">
        <h2>{Projectvalues.name}</h2>

        <ProjectTasksAction Counts={Countsval} btnclick={handlclick} />
      </div>
      <div className="card-body">
        {ProjectContent.pConType === "projecttasks" ? (
          <ProjectTasksTable
            ProTasks={Projectvalues.id}
            btnclick={handlclick}
          />
        ) : ProjectContent.pConType === "createtask" ? (
          <CreateTask
            pdata={Membersvalue}
            project_id={Projectvalues.id}
            task_created={handlclick}
          />
        ) : ProjectContent.pConType === "projectmembers" ? (
          <ProjectMembers
            // pdata={Membersvalue}
            project_id={Projectvalues.id}
            btnclick={handlclick}
          />
        ) : (
          <p className="card-text text-body">{Projectvalues.description}</p>
        )}
      </div>
    </div>
  );
}

export default ProjectViewAction;

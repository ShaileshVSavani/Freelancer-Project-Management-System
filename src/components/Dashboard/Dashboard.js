
import React, { useContext } from "react";

import { toast } from "react-toastify";
import { ProjectPaymentsContext } from "../../context/ProjectPaymentsContext";
import EarningsOverview from "./EarningsOverview";
import ProjectList from "../Projects/ProjectList";
import { mockEarnings } from "../../data/mockEarnings";

const Dashboard = () => {
  const { projects, setProjects, payments, setPayments } = useContext(ProjectPaymentsContext);

  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    const updatedPayments = payments.filter((payment) => payment.projectId !== projectId);
    setProjects(updatedProjects);
    setPayments(updatedPayments);
    toast.success("Project and related payments deleted successfully!");
  };

  const updateProject = (projectId, updatedData) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, ...updatedData } : project
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Earnings Overview</h2>
          <EarningsOverview data={mockEarnings}/>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col xl:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Project List</h2>
          <ProjectList
            projects={projects}
            onDeleteProject={deleteProject}
            onUpdateProject={updateProject}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

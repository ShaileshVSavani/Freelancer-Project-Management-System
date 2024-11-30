
import React, { useState } from "react";
import EarningsOverview from "./EarningsOverview";
import ProjectList from "../Projects/ProjectList";
import { mockEarnings } from "../../data/mockEarnings";

const Dashboard = () => {
  const [projects, setProjects] = useState(
    JSON.parse(localStorage.getItem("projects")) || []
  );

  // Function to delete a project
  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  // Function to update a project
  const handleUpdateProject = (id, updatedProject) => {
    const updatedProjects = projects.map((project) =>
      project.id === id ? { ...project, ...updatedProject } : project
    );
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Earnings Overview Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Earnings Overview</h2>
          <EarningsOverview data={mockEarnings} />
        </div>

        {/* Project List Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col xl:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Project List</h2>
          <ProjectList
            projects={projects}
            onDeleteProject={handleDeleteProject}
            onUpdateProject={handleUpdateProject} // Pass the update function
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

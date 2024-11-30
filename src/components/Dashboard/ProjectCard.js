
import React from "react";

const ProjectCard = ({ project }) => {
  const statusColors = {
    Active: "text-blue-500",
    Completed: "text-green-500",
  };

  return (
    <div className=" rounded-lg ">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
      <p className="text-gray-600 mb-1">Due: <span className="font-medium">{project.dueDate}</span></p>
      <p className="text-gray-600">
        Status:{" "}
        <span className={`font-bold px-2 py-1 rounded-full ${statusColors[project.status] || 'bg-gray-500 text-white'}`}>
          {project.status}
        </span>
      </p>
    </div>
  );
};

export default ProjectCard;

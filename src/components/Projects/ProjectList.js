
import React, { useState } from "react";
import { toast } from "react-toastify";
import ProjectCard from "../Dashboard/ProjectCard";

const ProjectList = ({ projects, onDeleteProject, onUpdateProject }) => {
  const [editingProject, setEditingProject] = useState(null);
  const [updatedProject, setUpdatedProject] = useState({
    name: "",
    dueDate: "",
    status: "Active",
  });

  const handleUpdateClick = (project) => {
    setEditingProject(project); // Open modal with the selected project
    setUpdatedProject({
      name: project.name,
      dueDate: project.dueDate,
      status: project.status,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (!updatedProject.name || !updatedProject.dueDate || !updatedProject.status) {
      toast.error("Please fill in all fields!");
      return;
    }

    onUpdateProject(editingProject.id, updatedProject); // Update the project
    toast.success("Project updated successfully!"); 
    setEditingProject(null); // Close the modal
  };

  const handleDelete = (id) => {
    onDeleteProject(id);
    toast.success("Project deleted successfully!"); 
  };

  return (
    <div>
      {projects.length === 0 ? (
        <div className="text-center p-6 bg-gray-100 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-gray-700">No Projects Available</h3>
          <p className="text-gray-600 mt-2">It seems you haven't added any projects yet. Please add a project to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="p-4 bg-gray-100 rounded shadow">
              <ProjectCard project={project} /> {/* Render ProjectCard for each project */}
              <div className="space-x-2 mt-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleUpdateClick(project)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(project.id)} // Call delete with project ID
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for updating project */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Project</h3>
            <form onSubmit={handleUpdateSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-600 font-medium">
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={updatedProject.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="dueDate" className="block text-gray-600 font-medium">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={updatedProject.dueDate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-gray-600 font-medium">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={updatedProject.status}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={() => setEditingProject(null)} // Close modal
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;

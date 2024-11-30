
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const AddProjectForm = ({ onSave, onUpdateProject, existingProject }) => {
  const [formState, setFormState] = useState({
    name: existingProject ? existingProject.name : "",
    dueDate: existingProject ? existingProject.dueDate : "",
    status: existingProject ? existingProject.status : "Active",
  });

  useEffect(() => {
    if (existingProject) {
      setFormState({
        name: existingProject.name,
        dueDate: existingProject.dueDate,
        status: existingProject.status,
      });
    }
  }, [existingProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formState.name || !formState.dueDate) {
      toast.error("Project name and due date are required!");
      return;
    }

    const project = {
      ...formState,
      id: existingProject ? existingProject.id : Date.now(),
    };

    let projects = [];
    try {
      projects = JSON.parse(localStorage.getItem("projects")) || [];
    } catch (error) {
      console.error("Error parsing projects from localStorage:", error);
    }

    if (existingProject) {
      // If the project already exists, update it
      if (onUpdateProject) {
        onUpdateProject(project); // Call onUpdateProject passed from AddProjectPage
      }
    } else {
      // Check if the project already exists
      const duplicateProject = projects.find(
        (existing) => existing.name.toLowerCase() === project.name.toLowerCase()
      );

      if (duplicateProject) {
        toast.error("A project with this name already exists!");
        return;
      }

      // If it's a new project, add it
      projects.push(project);
      localStorage.setItem("projects", JSON.stringify(projects));
      toast.success("Project added successfully!");

      if (onSave) {
        onSave(project);
      }
    }

    setFormState({ name: "", dueDate: "", status: "Active" });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-24">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
        {existingProject ? "Update Project" : "Add New Project"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-600 font-medium">
            Project Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Enter project name"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-gray-600 font-medium">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={formState.dueDate}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-gray-600 font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formState.status}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {existingProject ? "Update Project" : "Add Project"}
        </button>
      </form>
      {/* Add ToastContainer */}
      <ToastContainer />
    </div>
  );
};

AddProjectForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onUpdateProject: PropTypes.func,
  existingProject: PropTypes.object,
};

AddProjectForm.defaultProps = {
  onSave: () => {},
};

export default AddProjectForm;

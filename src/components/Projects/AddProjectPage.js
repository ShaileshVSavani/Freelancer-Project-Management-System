
// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import AddProjectForm from "../Projects/AddProjectForm";
// import { toast } from "react-toastify"; 

// const AddProjectPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const existingProject = location.state?.project || null;

//   const handleSave = (project) => {
//     let projects = [];
//     try {
//       projects = JSON.parse(localStorage.getItem("projects")) || [];
//     } catch (error) {
//       console.error("Error parsing projects from localStorage:", error);
//     }

//     const duplicateProject = projects.find(
//       (existing) => existing.name.toLowerCase() === project.name.toLowerCase()
//     );

//     if (duplicateProject) {
//       toast.error("A project with this name already exists!");
//       return;
//     }

//     projects.push(project);
//     localStorage.setItem("projects", JSON.stringify(projects));
//     toast.success("Project added successfully!");
//     navigate("/"); // Navigate back to the dashboard
//   };

//   const handleUpdateProject = (updatedProject) => {
//     let projects = [];
//     try {
//       projects = JSON.parse(localStorage.getItem("projects")) || [];
//     } catch (error) {
//       console.error("Error parsing projects from localStorage:", error);
//     }

//     const updatedProjects = projects.map((project) =>
//       project.id === updatedProject.id ? updatedProject : project
//     );
//     localStorage.setItem("projects", JSON.stringify(updatedProjects));

//     toast.success("Project updated successfully!");
//     navigate("/"); // Navigate back after updating
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
//       <AddProjectForm
//         onSave={handleSave}
//         onUpdateProject={handleUpdateProject} // Pass onUpdateProject here
//         existingProject={existingProject}
//       />
//     </div>
//   );
// };

// export default AddProjectPage;

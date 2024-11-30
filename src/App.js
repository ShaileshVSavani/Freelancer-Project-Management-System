
import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import AddProjectForm from "./components/Projects/AddProjectForm";
import ProjectList from "./components/Projects/ProjectList";
import EarningsOverview from "./components/Dashboard/EarningsOverview";
import Navigation from "./components/Navigation";
import Payments from "./components/Payments/Payments"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <ToastContainer />
      <Navigation />
      <Routes>
      <Route path="/" element={<HomePage />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/earnings" element={<EarningsOverview />} />
        <Route path="/add-project" element={<AddProjectForm />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/payments" element={<Payments />} /> 
      </Routes>
    </div>
  );
};

export default App;

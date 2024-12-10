
import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import AddProjectForm from "./components/Projects/AddProjectForm";
import Payments from "./components/Payments/Payments";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import { ProjectPaymentsProvider } from "./context/ProjectPaymentsContext";
import "./index.css";

const App = () => {
  return (
    <ProjectPaymentsProvider>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-project" element={<AddProjectForm />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </div>
    </ProjectPaymentsProvider>
  );
};

export default App;

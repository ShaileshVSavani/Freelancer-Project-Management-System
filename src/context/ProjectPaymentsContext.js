
import { createContext, useState, useEffect } from "react";

// Initialize context state from localStorage
const initialProjects = JSON.parse(localStorage.getItem("projects")) || [];
const initialPayments = JSON.parse(localStorage.getItem("payments")) || [];

export const ProjectPaymentsContext = createContext();

export const ProjectPaymentsProvider = ({ children }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [payments, setPayments] = useState(initialPayments);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("payments", JSON.stringify(payments));
  }, [projects, payments]);

  const addPayment = (newPayment) => {
    setPayments((prevPayments) => [...prevPayments, newPayment]);
  };

  const updatePaymentStatus = (paymentId, newStatus) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === paymentId ? { ...payment, status: newStatus } : payment
      )
    );
  };

  return (
    <ProjectPaymentsContext.Provider value={{ projects, setProjects, payments, addPayment, updatePaymentStatus, setPayments }}>
      {children}
    </ProjectPaymentsContext.Provider>
  );
};


import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newPayment, setNewPayment] = useState({
    projectId: "",
    amount: "",
    status: "Unpaid",
  });

  useEffect(() => {
    // Load projects and payments from localStorage on component mount
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);

    const storedPayments = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(storedPayments);
  }, []);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddPayment = (e) => {
    e.preventDefault();

    // Check if all fields are filled out
    if (!newPayment.projectId || !newPayment.amount || !newPayment.status) {
      toast.error("All fields are required!");
      return;
    }

    // Ensure that the amount is a positive number
    if (parseFloat(newPayment.amount) <= 0) {
      toast.error("Amount must be a positive number.");
      return;
    }

    // Check if a payment already exists for the selected project
    const existingPayment = payments.find(
      (payment) => payment.projectId === newPayment.projectId
    );

    if (existingPayment) {
      // If a payment already exists for this project, show a warning
      toast.warning("A payment has already been added for this project.");
      return;
    }

    // Create a new payment entry
    const newPaymentEntry = {
      id: Date.now(), // Ensure unique ID for each payment entry
      projectId: newPayment.projectId,
      amount: parseFloat(newPayment.amount),
      status: newPayment.status,
    };

    // Add the new payment to the list
    const updatedPayments = [...payments, newPaymentEntry];
    setPayments(updatedPayments);
    localStorage.setItem("payments", JSON.stringify(updatedPayments));

    // Show a success notification
    toast.success("Payment added successfully!");

    // Clear the form after submission
    setNewPayment({
      projectId: "",
      amount: "",
      status: "Unpaid",
    });
  };

  const handleMarkAsPaid = (paymentId) => {
    const updatedPayments = payments.map((payment) =>
      payment.id === paymentId ? { ...payment, status: "Paid" } : payment
    );

    setPayments(updatedPayments);
    localStorage.setItem("payments", JSON.stringify(updatedPayments));

    // Show success notification
    toast.success("Payment marked as paid!");
  };

  return (
    <div className="mt-24 max-w-7xl mx-auto p-6 bg-gradient-to-r from-[#003366] via-[#00A9E0] to-[#003366] text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Payments Management</h2>

      {/* Flex container for the form and the project list */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Payment Form Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-center">Add Payment</h3>
          <form onSubmit={handleAddPayment} className="space-y-6">
            <div className="w-full">
              <label htmlFor="projectId" className="block text-gray-600 font-medium">
                Select Project
              </label>
              <select
                id="projectId"
                name="projectId"
                value={newPayment.projectId}
                onChange={handlePaymentChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">--Select Project--</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label htmlFor="amount" className="block text-gray-600 font-medium">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                name="amount"
                value={newPayment.amount}
                onChange={handlePaymentChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter payment amount"
              />
            </div>

            <div className="w-full">
              <label htmlFor="status" className="block text-gray-600 font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={newPayment.status}
                onChange={handlePaymentChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Add Payment
            </button>
          </form>
        </div>

        {/* Payments List Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-center">Payments List</h3>
          {payments.length > 0 ? (
            <ul className="space-y-4">
              {payments.map((payment) => {
                // Ensure both IDs are treated as numbers and avoid showing payments with non-existing projects
                const project = projects.find(
                  (p) => Number(p.id) === Number(payment.projectId)
                );

                if (!project) {
                  return null; // Skip displaying this payment if project is deleted or not found
                }

                return (
                  <li
                    key={payment.id}
                    className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition"
                  >
                    <div>
                      <p className="text-lg font-medium">Project: {project.name}</p>
                      <p>Amount: Rs. {payment.amount}</p>
                      <p>Status: {payment.status}</p>
                    </div>
                    <button
                      className={`py-2 px-4 rounded-md ${
                        payment.status === "Paid"
                          ? "bg-green-500 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      } text-white`}
                      onClick={() => handleMarkAsPaid(payment.id)}
                      disabled={payment.status === "Paid"}
                    >
                      {payment.status === "Paid" ? "Paid" : "Mark as Paid"}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No payments to display.</p>
          )}
        </div>
      </div>

      {/* Toast Container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default Payments;

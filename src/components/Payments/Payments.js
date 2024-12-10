
import React, { useContext, useState } from "react";
import { ProjectPaymentsContext } from "../../context/ProjectPaymentsContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payments = () => {
  const { projects, payments, addPayment, updatePaymentStatus } =
    useContext(ProjectPaymentsContext);

  const [newPayment, setNewPayment] = useState({
    projectId: "",
    amount: "",
    status: "Unpaid",
  });

  // Handle form input change
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prev) => ({ ...prev, [name]: value }));
  };

  // Handle payment submission
  const handleAddPayment = (e) => {
    e.preventDefault();

    if (!newPayment.projectId || !newPayment.amount) {
      toast.error("All fields are required!");
      return;
    }

    const amount = parseFloat(newPayment.amount);
    if (amount <= 0) {
      toast.error("Amount must be greater than zero!");
      return;
    }

    // Check if a payment already exists for the selected project
    const existingPayment = payments.some(
      (payment) => payment.projectId === newPayment.projectId
    );

    if (existingPayment) {
      toast.error("Payment already exists for this project!");
      return;
    }

    const newPaymentEntry = {
      id: Date.now(),
      projectId: newPayment.projectId,
      amount,
      status: newPayment.status,
    };

    addPayment(newPaymentEntry); // Update context and localStorage
    toast.success("Payment added successfully!");
    setNewPayment({ projectId: "", amount: "", status: "Unpaid" });
  };

  // Handle marking payment as "Paid"
  const handleMarkAsPaid = (paymentId) => {
    updatePaymentStatus(paymentId, "Paid");
    toast.success("Payment marked as paid!");
  };

  // Filter payments based on valid projects (excluding deleted projects)
  const validPayments = payments.filter((payment) =>
    projects.some((project) => String(project.id) === String(payment.projectId))
  );

  // Calculate Total Earnings and Paid Earnings based on valid payments
  const totalEarnings = validPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidEarnings = validPayments
    .filter((payment) => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="mt-24 max-w-7xl mx-auto p-6 bg-gradient-to-r from-[#003366] via-[#00A9E0] to-[#003366] text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Payments Management</h2>

      {/* Earnings Summary */}
      <div className="mb-6 flex justify-around bg-white text-gray-800 p-4 rounded-lg shadow-md">
        <div>
          <h3 className="text-lg font-semibold">Total Earnings</h3>
          <p className="text-xl font-bold">Rs. {totalEarnings.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Paid Earnings</h3>
          <p className="text-xl font-bold">Rs. {paidEarnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Add Payment Form */}
      <div className="flex flex-col lg:flex-row gap-8">
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

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Add Payment
            </button>
          </form>
        </div>

        {/* Payments List */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-center">Payments List</h3>
          {validPayments.length ? (
            <ul className="space-y-4">
              {validPayments.map((payment) => {
                const project = projects.find((p) => String(p.id) === String(payment.projectId));
                if (!project) return null;

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
                      className={`py-2 px-4 rounded-md ${payment.status === "Paid" ? "bg-green-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} text-white`}
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
            <p className="text-center text-gray-600">No payments available.</p>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Payments;

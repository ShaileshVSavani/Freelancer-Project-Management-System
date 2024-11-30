
import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#003366] via-[#00A9E0] to-[#003366] text-white text-center py-20 mt-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
          Welcome to Project Manager
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">
          Streamline your projects, manage tasks, and collaborate effectively in one place.
        </p>
        <button className="bg-white text-[#003366] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#5BC0EB] transition duration-300">
          Add Your First Project
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-[#333333] mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center bg-[#F7F8FA] p-8 rounded-lg shadow-lg hover:bg-[#E1E6EB] transition duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Easy Project Tracking</h3>
              <p className="text-[#333333]">
                Effortlessly track project progress, deadlines, and status all in one dashboard.
              </p>
            </div>

            <div className="text-center bg-[#F7F8FA] p-8 rounded-lg shadow-lg hover:bg-[#E1E6EB] transition duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Collaborative Features</h3>
              <p className="text-[#333333]">
                Collaborate with your team members, assign tasks, and track progress seamlessly.
              </p>
            </div>

            <div className="text-center bg-[#F7F8FA] p-8 rounded-lg shadow-lg hover:bg-[#E1E6EB] transition duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Payments & Invoices</h3>
              <p className="text-[#333333]">
                Manage payments, generate invoices, and keep your projects financially organized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#00A9E0] text-white text-center py-16">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Ready to Get Started?</h2>
        <p className="text-lg sm:text-xl mb-6">
          Create your first project and streamline your workflow today!
        </p>
        <button className="bg-white text-[#00A9E0] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#E1E6EB] transition duration-300">
          Create Project Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#1A2A6C] text-white py-6 text-center">
  <p>&copy; 2024 Project Manager. All rights reserved.</p>
</footer>

    </div>
  );
};

export default HomePage;

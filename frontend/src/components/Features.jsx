
import React from "react";
const Features = () => {
  return (
    <section className="py-20 px-8 bg-white">
      <h3 className="text-3xl font-bold text-center text-gray-800">
        Powerful Features
      </h3>

      <div className="mt-12 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        
        <div className="p-8 rounded-xl shadow-md hover:shadow-lg transition">
          <h4 className="text-xl font-semibold text-blue-600">
            Secure Authentication
          </h4>
          <p className="mt-4 text-gray-600">
            JWT-based authentication with protected routes and secure access.
          </p>
        </div>

        <div className="p-8 rounded-xl shadow-md hover:shadow-lg transition">
          <h4 className="text-xl font-semibold text-blue-600">
            Application Tracking
          </h4>
          <p className="mt-4 text-gray-600">
            Track status: Applied, Interview, Rejected, Selected.
          </p>
        </div>

        <div className="p-8 rounded-xl shadow-md hover:shadow-lg transition">
          <h4 className="text-xl font-semibold text-blue-600">
            Clean Dashboard
          </h4>
          <p className="mt-4 text-gray-600">
            View all your internship applications in one organized place.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Features;
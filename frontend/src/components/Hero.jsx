import React from "react";
const Hero = () => {
  return (
    <section className="text-center py-24 px-6 bg-gradient-to-br from-blue-50 to-white">
      <h2 className="text-5xl font-bold text-gray-800 leading-tight max-w-4xl mx-auto">
        Track Your Internship Journey
        <span className="text-blue-600"> Like a Pro</span>
      </h2>

      <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
        A clean and efficient way to manage your internship applications,
        track progress, and stay ahead in your career journey.
      </p>

      <div className="mt-10">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-lg hover:bg-blue-700 transition">
          Start Tracking Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
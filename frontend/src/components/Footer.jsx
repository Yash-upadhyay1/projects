import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} InternshipTracker. Built by Yash Upadhyay.
    </footer>
  );
};

export default Footer;
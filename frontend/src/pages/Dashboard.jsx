import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

const Dashboard = () => {
  const [internships, setInternships] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    status: "Applied",
  });

  // ================= FETCH =================
  const fetchInternships = async () => {
    try {
      const res = await api.get("/internships");
      setInternships(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= HANDLE EDIT =================
  const handleEdit = (internship) => {
    setFormData({
      companyName: internship.companyName,
      role: internship.role,
      status: internship.status,
    });
    setEditingId(internship._id);
  };

  // ================= HANDLE DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this internship?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/internships/${id}`);
      fetchInternships();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/internships/${editingId}`, formData);
        setEditingId(null);
      } else {
        await api.post("/internships", formData);
      }

      setFormData({
        companyName: "",
        role: "",
        status: "Applied",
      });

      fetchInternships();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= STATUS COUNTS =================
  const appliedCount = internships.filter(
    (item) => item.status === "Applied"
  ).length;

  const interviewCount = internships.filter(
    (item) => item.status === "Interview"
  ).length;

  const rejectedCount = internships.filter(
    (item) => item.status === "Rejected"
  ).length;

  const selectedCount = internships.filter(
    (item) => item.status === "Selected"
  ).length;

  // ================= RETURN =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-8 py-16">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Internship Dashboard
        </h1>
        <span className="text-gray-500 text-sm">
          Track your applications like a pro 🚀
        </span>
      </div>

      {/* ===== STATS SECTION ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatCard title="Applied" value={appliedCount} color="blue" />
        <StatCard title="Interview" value={interviewCount} color="green" />
        <StatCard title="Rejected" value={rejectedCount} color="red" />
        <StatCard title="Selected" value={selectedCount} color="purple" />
      </div>

      {/* ===== FORM ===== */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg grid md:grid-cols-4 gap-6"
      >
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Selected">Selected</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md"
        >
          {editingId ? "Update Internship" : "Add Internship"}
        </button>
      </form>

      {/* ===== INTERNSHIP CARDS ===== */}
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {internships.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No internships yet. Start adding your journey 🚀
          </div>
        ) : (
          internships.map((internship) => (
            <motion.div
              key={internship._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {internship.companyName}
              </h2>

              <p className="text-gray-600 mt-2">
                {internship.role}
              </p>

              <div className="flex justify-between items-center mt-6">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                  {internship.status}
                </span>

                <div className="space-x-4">
                  <button
                    onClick={() => handleEdit(internship)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(internship._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

// ===== StatCard Component =====
const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    purple: "text-purple-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
    >
      <p className="text-gray-500 text-sm mb-2">{title}</p>
      <h2 className={`text-3xl font-bold ${colors[color]}`}>
        {value}
      </h2>
    </motion.div>
  );
};

export default Dashboard;
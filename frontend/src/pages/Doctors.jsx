
import { useEffect, useState } from "react";
import api from "../api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    phone: "",
    experience: "",
    status: true,
  });

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const response = await api.get("doctors/");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add / Update doctor
  const handleSubmit = async () => {
    try {
      if (editingDoctorId) {
        await api.put(
          `doctors/${editingDoctorId}/`,
          formData
        );

        alert("Doctor updated successfully!");
      } else {
        await api.post("doctors/", formData);

        alert("Doctor added successfully!");
      }

      setFormData({
        name: "",
        specialization: "",
        phone: "",
        experience: "",
        status: true,
      });

      setEditingDoctorId(null);
      setShowForm(false);

      fetchDoctors();
    } catch (error) {
      console.error("Error saving doctor:", error);
      alert("Failed to save doctor.");
    }
  };

  // Delete doctor
  const handleDelete = async (id) => {
    try {
      await api.delete(`doctors/${id}/`);

      alert("Doctor deleted successfully!");

      setDoctors(
        doctors.filter((doctor) => doctor.id !== id)
      );
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor.");
    }
  };

  // Edit doctor
  const handleEdit = (doctor) => {
    setEditingDoctorId(doctor.id);

    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      phone: doctor.phone,
      experience: doctor.experience,
      status: doctor.status,
    });

    setShowForm(true);
  };

  // Open Add Doctor form
  const handleAddDoctor = () => {
    setEditingDoctorId(null);

    setFormData({
      name: "",
      specialization: "",
      phone: "",
      experience: "",
      status: true,
    });

    setShowForm(!showForm);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Doctors
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage hospital doctors and their information.
        </p>
      </div>

      {/* Add / Edit Doctor Form */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            {editingDoctorId
              ? "Edit Doctor"
              : "Add New Doctor"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the doctor's information.
          </p>

          {/* Name */}
          <div className="mt-5">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter doctor name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Specialization */}
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Specialization
            </label>

            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Enter specialization"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Experience */}
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Experience
            </label>

            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Years of experience"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div className="mt-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    status: event.target.checked,
                  })
                }
              />

              Active Doctor
            </label>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              {editingDoctorId
                ? "Update Doctor"
                : "Save Doctor"}
            </button>
          </div>
        </div>
      )}

      {/* Doctor List Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Doctor List
          </h2>
        </div>

        <button
          onClick={handleAddDoctor}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {showForm ? "Close Form" : "+ Add Doctor"}
        </button>
      </div>

      {/* Doctor Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                Name
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                Specialization
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                Phone
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                Experience
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="border-t border-slate-200"
              >
                <td className="px-5 py-4 text-sm font-medium text-slate-800">
                  {doctor.name}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {doctor.specialization}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {doctor.phone}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {doctor.experience} years
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {doctor.status ? "Active" : "Inactive"}
                </td>

                <td className="px-5 py-4 text-sm">
                  <button
                    onClick={() => handleEdit(doctor)}
                    className="mr-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Doctors;



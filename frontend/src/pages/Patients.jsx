import { useEffect, useState } from "react";
import api from "../api";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    blood_group: "",
  });

  const [editingPatientId, setEditingPatientId] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingPatientId) {
        await api.put(`patients/${editingPatientId}/`, formData);

        alert("Patient updated successfully!");
      } else {
        await api.post("patients/", formData);

        alert("Patient added successfully!");
      }

      setFormData({
        name: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        blood_group: "",
      });

      setEditingPatientId(null);
      setShowForm(false);

      const response = await api.get("patients/");
      setPatients(response.data);
    } catch (error) {
      console.error("Error saving patient:", error);
      alert("Failed to save patient.");
    }
  };

  const handleEdit = (patient) => {
    setEditingPatientId(patient.id);

    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      address: patient.address,
      blood_group: patient.blood_group,
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`patients/${id}/`);

      alert("Patient deleted successfully!");

      setPatients(
        patients.filter((patient) => patient.id !== id)
      );
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient.");
    }
  };

  useEffect(() => {
    api
      .get("patients/")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  }, []);

  return (
    <div>
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Patients
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage hospital patients and their information.
        </p>
      </div>

      {/* Add/Edit Patient Form */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            {editingPatientId ? "Edit Patient" : "Add New Patient"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the patient's information.
          </p>

          <div className="mt-5">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter patient name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Age
            </label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter patient age"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

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

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter patient address"
              rows="3"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Blood Group
            </label>

            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Save Patient
            </button>
          </div>
        </div>
      )}

      {/* Patient section */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Patient List
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage registered patients.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add Patient
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                  Name
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                  Age
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                  Gender
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                  Blood Group
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                  Phone
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-t border-slate-200"
                >
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">
                    {patient.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {patient.age}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {patient.gender}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {patient.blood_group}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {patient.phone}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    <button
                      onClick={() => handleEdit(patient)}
                      className="mr-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(patient.id)}
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
    </div>
  );
}

export default Patients;

import { useEffect, useState } from "react";
import api from "../api";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [editingPrescriptionId, setEditingPrescriptionId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    medicine: "",
    dosage: "",
    instructions: "",
  });

  // Fetch all data
  useEffect(() => {
    fetchPrescriptions();
    fetchPatients();
    fetchDoctors();
  }, []);

  // Fetch prescriptions
  const fetchPrescriptions = async () => {
    try {
      const response = await api.get("prescriptions/");
      setPrescriptions(response.data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  // Fetch patients
  const fetchPatients = async () => {
    try {
      const response = await api.get("patients/");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const response = await api.get("doctors/");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingPrescriptionId) {
        const response = await api.put(
          `prescriptions/${editingPrescriptionId}/`,
          formData
        );

        setPrescriptions(
          prescriptions.map((prescription) =>
            prescription.id === editingPrescriptionId
              ? response.data
              : prescription
          )
        );

        alert("Prescription updated successfully!");
      } else {
        const response = await api.post(
          "prescriptions/",
          formData
        );

        setPrescriptions([
          ...prescriptions,
          response.data,
        ]);

        alert("Prescription added successfully!");
      }

      setFormData({
        patient: "",
        doctor: "",
        medicine: "",
        dosage: "",
        instructions: "",
      });

      setEditingPrescriptionId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving prescription:", error);
      alert("Failed to save prescription.");
    }
  };

  // Edit prescription
  const handleEdit = (prescription) => {
    setEditingPrescriptionId(prescription.id);

    setFormData({
      patient: prescription.patient,
      doctor: prescription.doctor,
      medicine: prescription.medicine,
      dosage: prescription.dosage,
      instructions: prescription.instructions,
    });

    setShowForm(true);
  };

  // Delete prescription
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prescription?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`prescriptions/${id}/`);

      setPrescriptions(
        prescriptions.filter(
          (prescription) => prescription.id !== id
        )
      );

      alert("Prescription deleted successfully!");
    } catch (error) {
      console.error("Error deleting prescription:", error);
      alert("Failed to delete prescription.");
    }
  };

  // Add prescription button
  const handleAddPrescription = () => {
    setEditingPrescriptionId(null);

    setFormData({
      patient: "",
      doctor: "",
      medicine: "",
      dosage: "",
      instructions: "",
    });

    setShowForm(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Prescriptions
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage patient prescriptions.
          </p>
        </div>

        <button
          onClick={handleAddPrescription}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          + Add Prescription
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            {editingPrescriptionId
              ? "Edit Prescription"
              : "Add Prescription"}
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Patient */}
            <select
              value={formData.patient}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  patient: e.target.value,
                })
              }
              className="rounded-lg border border-slate-300 px-4 py-2"
            >
              <option value="">Select Patient</option>

              {patients.map((patient) => (
                <option
                  key={patient.id}
                  value={patient.id}
                >
                  {patient.name}
                </option>
              ))}
            </select>

            {/* Doctor */}
            <select
              value={formData.doctor}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  doctor: e.target.value,
                })
              }
              className="rounded-lg border border-slate-300 px-4 py-2"
            >
              <option value="">Select Doctor</option>

              {doctors.map((doctor) => (
                <option
                  key={doctor.id}
                  value={doctor.id}
                >
                  {doctor.name}
                </option>
              ))}
            </select>

            {/* Medicine */}
            <input
              type="text"
              placeholder="Medicine"
              value={formData.medicine}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  medicine: e.target.value,
                })
              }
              className="rounded-lg border border-slate-300 px-4 py-2"
            />

            {/* Dosage */}
            <input
              type="text"
              placeholder="Dosage"
              value={formData.dosage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dosage: e.target.value,
                })
              }
              className="rounded-lg border border-slate-300 px-4 py-2"
            />

            {/* Instructions */}
            <textarea
              placeholder="Instructions"
              value={formData.instructions}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  instructions: e.target.value,
                })
              }
              className="rounded-lg border border-slate-300 px-4 py-2 md:col-span-2"
              rows="3"
            />
          </div>

          {/* Form buttons */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              {editingPrescriptionId
                ? "Update Prescription"
                : "Save Prescription"}
            </button>

            <button
              onClick={() => {
                setShowForm(false);
                setEditingPrescriptionId(null);
              }}
              className="rounded-lg bg-slate-200 px-5 py-2 text-slate-700 hover:bg-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Prescription Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                Patient
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                Doctor
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                Medicine
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                Dosage
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                Instructions
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                Date
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                {/* Patient */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {patients.find(
                    (patient) =>
                      Number(patient.id) ===
                      Number(prescription.patient)
                  )?.name || "Unknown Patient"}
                </td>

                {/* Doctor */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {doctors.find(
                    (doctor) =>
                      Number(doctor.id) ===
                      Number(prescription.doctor)
                  )?.name || "Unknown Doctor"}
                </td>

                {/* Medicine */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {prescription.medicine}
                </td>

                {/* Dosage */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {prescription.dosage}
                </td>

                {/* Instructions */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {prescription.instructions}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {prescription.prescribed_date}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleEdit(prescription)
                      }
                      className="rounded-lg bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(prescription.id)
                      }
                      className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {prescriptions.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-8 text-center text-sm text-slate-500"
                >
                  No prescriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prescriptions;

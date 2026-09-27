
import { useEffect, useState } from "react";
import api from "../api";

const MedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState(null);

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    diagnosis: "",
    symptoms: "",
    treatment: "",
  });

  // Fetch all data
  useEffect(() => {
    fetchMedicalRecords();
    fetchPatients();
    fetchDoctors();
  }, []);

  // Fetch medical records
  const fetchMedicalRecords = async () => {
    try {
      const response = await api.get("medical-records/");
      setMedicalRecords(response.data);
    } catch (error) {
      console.error("Error fetching medical records:", error);
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
      if (editingRecordId) {
        const response = await api.put(
          `medical-records/${editingRecordId}/`,
          formData
        );

        setMedicalRecords(
          medicalRecords.map((record) =>
            record.id === editingRecordId
              ? response.data
              : record
          )
        );

        alert("Medical record updated successfully!");
      } else {
        const response = await api.post(
          "medical-records/",
          formData
        );

        setMedicalRecords([
          ...medicalRecords,
          response.data,
        ]);

        alert("Medical record added successfully!");
      }

      setFormData({
        patient: "",
        doctor: "",
        diagnosis: "",
        symptoms: "",
        treatment: "",
      });

      setEditingRecordId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving medical record:", error);
      alert("Failed to save medical record.");
    }
  };

  // Edit medical record
  const handleEdit = (record) => {
    setEditingRecordId(record.id);

    setFormData({
      patient: record.patient,
      doctor: record.doctor,
      diagnosis: record.diagnosis,
      symptoms: record.symptoms,
      treatment: record.treatment,
    });

    setShowForm(true);
  };

  // Delete medical record
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medical record?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`medical-records/${id}/`);

      setMedicalRecords(
        medicalRecords.filter(
          (record) => record.id !== id
        )
      );

      alert("Medical record deleted successfully!");
    } catch (error) {
      console.error("Error deleting medical record:", error);
      alert("Failed to delete medical record.");
    }
  };

  // Add medical record
  const handleAddRecord = () => {
    setEditingRecordId(null);

    setFormData({
      patient: "",
      doctor: "",
      diagnosis: "",
      symptoms: "",
      treatment: "",
    });

    setShowForm(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Medical Records
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage patient medical records.
          </p>
        </div>

        <button
          onClick={() => {
            if (showForm) {
              setShowForm(false);
              setEditingRecordId(null);
            } else {
              handleAddRecord();
            }
          }}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          {showForm ? "Close Form" : "+ Add Medical Record"}
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            {editingRecordId
              ? "Edit Medical Record"
              : "Add Medical Record"}
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

            {/* Diagnosis */}
            <input
              type="text"
              placeholder="Diagnosis"
              value={formData.diagnosis}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  diagnosis: e.target.value,
                })
              }
              className="rounded-lg border border-slate-300 px-4 py-2"
            />

            {/* Symptoms */}
            <textarea
              placeholder="Symptoms"
              value={formData.symptoms}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  symptoms: e.target.value,
                })
              }
              className="rounded-lg border border-slate-300 px-4 py-2"
              rows="3"
            />

            {/* Treatment */}
            <textarea
              placeholder="Treatment"
              value={formData.treatment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  treatment: e.target.value,
                })
              }
              className="rounded-lg border border-slate-300 px-4 py-2 md:col-span-2"
              rows="3"
            />
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              {editingRecordId
                ? "Update Record"
                : "Save Record"}
            </button>

            <button
              onClick={() => {
                setShowForm(false);
                setEditingRecordId(null);
              }}
              className="rounded-lg bg-slate-200 px-5 py-2 text-slate-700 hover:bg-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Medical Records Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[1000px] text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium uppercase text-slate-500">
                Patient
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase text-slate-500">
                Doctor
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase text-slate-500">
                Diagnosis
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase text-slate-500">
                Symptoms
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase text-slate-500">
                Treatment
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase text-slate-500">
                Date
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {medicalRecords.map((record) => (
              <tr key={record.id}>
                {/* Patient */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {patients.find(
                    (patient) =>
                      Number(patient.id) ===
                      Number(record.patient)
                  )?.name || "Unknown Patient"}
                </td>

                {/* Doctor */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {doctors.find(
                    (doctor) =>
                      Number(doctor.id) ===
                      Number(record.doctor)
                  )?.name || "Unknown Doctor"}
                </td>

                {/* Diagnosis */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {record.diagnosis}
                </td>

                {/* Symptoms */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {record.symptoms}
                </td>

                {/* Treatment */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {record.treatment}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {record.record_date}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(record)}
                      className="rounded-lg bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(record.id)
                      }
                      className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {medicalRecords.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-8 text-center text-sm text-slate-500"
                >
                  No medical records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalRecords;


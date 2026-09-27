import { useEffect, useState } from "react";
import api from "../api";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
    status: "Scheduled",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsResponse = await api.get("appointments/");
        const patientsResponse = await api.get("patients/");
        const doctorsResponse = await api.get("doctors/");

        setAppointments(appointmentsResponse.data);
        setPatients(patientsResponse.data);
        setDoctors(doctorsResponse.data);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingAppointmentId) {
        const response = await api.put(
          `appointments/${editingAppointmentId}/`,
          formData
        );

        setAppointments(
          appointments.map((appointment) =>
            appointment.id === editingAppointmentId
              ? response.data
              : appointment
          )
        );

        alert("Appointment updated successfully!");
      } else {
        const response = await api.post(
          "appointments/",
          formData
        );

        setAppointments([...appointments, response.data]);

        alert("Appointment added successfully!");
      }

      setFormData({
        patient: "",
        doctor: "",
        appointment_date: "",
        appointment_time: "",
        reason: "",
        status: "Scheduled",
      });

      setShowForm(false);
      setEditingAppointmentId(null);
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Failed to save appointment.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`appointments/${id}/`);

      setAppointments(
        appointments.filter(
          (appointment) => appointment.id !== id
        )
      );

      alert("Appointment deleted successfully!");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment.");
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointmentId(appointment.id);

    setFormData({
      patient: appointment.patient,
      doctor: appointment.doctor,
      appointment_date: appointment.appointment_date,
      appointment_time: appointment.appointment_time,
      reason: appointment.reason,
      status: appointment.status,
    });

    setShowForm(true);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Appointments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage patient appointments and doctor schedules.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Appointment List
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View and manage scheduled appointments.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {showForm ? "Close Form" : "+ Add Appointment"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-800">
            {editingAppointmentId
              ? "Edit Appointment"
              : "Add New Appointment"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select a patient and doctor and enter appointment details.
          </p>

          {/* Patient */}
          <div className="mt-5">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Patient
            </label>

            <select
              name="patient"
              value={formData.patient}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  patient: event.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              required
            >
              <option value="">Select patient</option>

              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor */}
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Doctor
            </label>

            <select
              name="doctor"
              value={formData.doctor}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  doctor: event.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              required
            >
              <option value="">Select doctor</option>

              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          {/* Appointment Date */}
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Appointment Date
            </label>

            <input
              type="date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  appointment_date: event.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Appointment Time */}
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Appointment Time
            </label>

            <input
              type="time"
              name="appointment_time"
              value={formData.appointment_time}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  appointment_time: event.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Reason */}
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Reason
            </label>

            <textarea
              name="reason"
              value={formData.reason}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  reason: event.target.value,
                })
              }
              placeholder="Enter reason for appointment"
              rows="3"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Status */}
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  status: event.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingAppointmentId(null);

                setFormData({
                  patient: "",
                  doctor: "",
                  appointment_date: "",
                  appointment_time: "",
                  reason: "",
                  status: "Scheduled",
                });
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {editingAppointmentId
                ? "Update Appointment"
                : "Save Appointment"}
            </button>
          </div>
        </form>
      )}

      {/* Appointment Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                Patient
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                Doctor
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                Date
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                Time
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                Reason
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                Status
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-t border-slate-200"
              >
                <td className="px-5 py-4 text-sm text-slate-600">
                  {patients.find(
                    (patient) =>
                      Number(patient.id) === Number(appointment.patient)
                  )?.name || "Unknown Patient"}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {doctors.find(
                    (doctor) =>
                      Number(doctor.id) === Number(appointment.doctor)
                  )?.name || "Unknown Doctor"}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {appointment.appointment_date}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {appointment.appointment_time}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {appointment.reason}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {appointment.status}
                </td>

                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(appointment)}
                      className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
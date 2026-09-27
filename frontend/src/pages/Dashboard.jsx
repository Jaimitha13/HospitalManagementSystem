import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [billings, setBillings] = useState([]);

  const getPatientName = (patientId) => {
    const patient = patients.find(
      (patient) => Number(patient.id) === Number(patientId)
    );

    return patient?.name || "Unknown Patient";
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(
      (doctor) => Number(doctor.id) === Number(doctorId)
    );

    return doctor?.name || "Unknown Doctor";
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          patientsResponse,
          doctorsResponse,
          appointmentsResponse,
          billingsResponse,
        ] = await Promise.all([
          api.get("patients/"),
          api.get("doctors/"),
          api.get("appointments/"),
          api.get("billings/"),
        ]);

        setPatients(patientsResponse.data);
        setDoctors(doctorsResponse.data);
        setAppointments(appointmentsResponse.data);
        setBillings(billingsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: "Total Patients",
      value: patients.length,
      description: "Registered patients",
    },
    {
      title: "Total Doctors",
      value: doctors.length,
      description: "Active doctors",
    },
    {
      title: "Today's Appointments",
      value: appointments.length,
      description: "Scheduled today",
    },
    {
      title: "Pending Bills",
      value: billings.filter(
        (billing) => billing.payment_status === "Pending"
      ).length,
      description: "Payments pending",
    },
  ];

  return (
    <div>
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Hospital Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of hospital activities and information.
        </p>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">
              {stat.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              {stat.value}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Recent Appointments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest scheduled appointments
            </p>
          </div>

          <Link
            to="/appointments"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
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
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {appointments.slice(0, 5).map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">
                    {getPatientName(appointment.patient)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {getDoctorName(appointment.doctor)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {appointment.appointment_date}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {appointment.appointment_time}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Patients */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Recent Patients
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recently registered patients
            </p>
          </div>

          <Link
            to="/patients"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold uppercase text-slate-500">
                  Patient
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
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {patients.slice(0, 5).map((patient) => (
                <tr key={patient.id}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
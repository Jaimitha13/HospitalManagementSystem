import { useEffect, useState } from "react";
import api from "../api";

const Billing = () => {
  const [billings, setBillings] = useState([]);
  const [patients, setPatients] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingBillingId, setEditingBillingId] = useState(null);

  const [formData, setFormData] = useState({
    patient: "",
    description: "",
    amount: "",
    payment_status: "Pending",
  });

  useEffect(() => {
    fetchBillings();
    fetchPatients();
  }, []);

  const fetchBillings = async () => {
    try {
      const response = await api.get("billings/");
      setBillings(response.data);
    } catch (error) {
      console.error("Error fetching billings:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get("patients/");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingBillingId) {
        const response = await api.put(
          `billings/${editingBillingId}/`,
          formData
        );

        setBillings(
          billings.map((billing) =>
            billing.id === editingBillingId ? response.data : billing
          )
        );

        alert("Billing updated successfully!");
      } else {
        const response = await api.post("billings/", formData);

        setBillings([...billings, response.data]);

        alert("Billing added successfully!");
      }

      setFormData({
        patient: "",
        description: "",
        amount: "",
        payment_status: "Pending",
      });

      setEditingBillingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving billing:", error);
      alert("Failed to save billing.");
    }
  };

  const handleEdit = (billing) => {
    setEditingBillingId(billing.id);

    setFormData({
      patient: billing.patient,
      description: billing.description,
      amount: billing.amount,
      payment_status: billing.payment_status,
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this billing record?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`billings/${id}/`);

      setBillings(
        billings.filter((billing) => billing.id !== id)
      );

      alert("Billing deleted successfully!");
    } catch (error) {
      console.error("Error deleting billing:", error);
      alert("Failed to delete billing.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Billing & Payments
        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? "Close Form" : "+ Add Billing"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingBillingId ? "Edit Billing" : "Add Billing"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Patient</option>

              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <select
              name="payment_status"
              value={formData.payment_status}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>

            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded mt-4"
            >
              Save Billing
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {billings.map((billing) => (
              <tr key={billing.id} className="border-b">
                <td className="p-3">
                  {patients.find(
                    (patient) =>
                      Number(patient.id) === Number(billing.patient)
                  )?.name || "Unknown Patient"}
                </td>

                <td className="p-3">
                  {billing.description}
                </td>

                <td className="p-3">
                  ₹{billing.amount}
                </td>

                <td className="p-3">
                  {billing.payment_status}
                </td>

                <td className="p-3">
                  {billing.billing_date}
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(billing)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(billing.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
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
};

export default Billing;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import MedicalRecords from "./pages/MedicalRecords";
import Billing from "./pages/Billing";
import Login from "./pages/Login";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Main Application */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-slate-50">
              <Sidebar />

              <div className="lg:ml-64">
                <Navbar />

                <main className="p-4 sm:p-6 lg:p-8">
                  <Routes>
                   <Route
  path="/"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
                 <Route
  path="/patients"
  element={
    <ProtectedRoute>
      <Patients />
    </ProtectedRoute>
  }
/>
                  <Route
  path="/doctors"
  element={
    <ProtectedRoute>
      <Doctors />
    </ProtectedRoute>
  }
/>
                  <Route
  path="/appointments"
  element={
    <ProtectedRoute>
      <Appointments />
    </ProtectedRoute>
  }
/><Route
  path="/prescriptions"
  element={
    <ProtectedRoute>
      <Prescriptions />
    </ProtectedRoute>
  }
/>
                   <Route
  path="/medical-records"
  element={
    <ProtectedRoute>
      <MedicalRecords />
    </ProtectedRoute>
  }
/>
               <Route
  path="/billing"
  element={
    <ProtectedRoute>
      <Billing />
    </ProtectedRoute>
  }
/>
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
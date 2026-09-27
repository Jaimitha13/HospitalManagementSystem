import { useState } from "react";
import { NavLink } from "react-router-dom";
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

 const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Patients", path: "/patients" },
  {name:"Doctors",path:"/doctors"},
  {name:"Appointments",path:"/appointments"},
    { name: "Prescriptions", path: "/prescriptions" },
    { name: "Medical Records", path: "/medical-records" },
    { name: "Billing & Payments", path: "/billing" },
];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-slate-900 p-3 text-white shadow-lg lg:hidden"
      >
        ☰
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-slate-900 text-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-slate-700 px-6">
          <div>
            <h1 className="text-xl font-bold">MediCare</h1>
            <p className="text-xs text-slate-400">
              Hospital Management
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Main Menu
          </p>

          <div className="space-y-1">
           {menuItems.map((item) => (
  <NavLink
    key={item.name}
    to={item.path}
    onClick={() => setIsOpen(false)}
    className={({ isActive }) =>
      `block w-full rounded-lg px-3 py-3 text-left text-sm transition ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`
    }
  >
    {item.name}
  </NavLink>
))}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 w-full border-t border-slate-700 p-4">
          <button className="w-full rounded-lg px-3 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white">
            Settings
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
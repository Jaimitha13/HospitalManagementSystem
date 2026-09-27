import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/login");
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="ml-12 lg:ml-0">
        <h2 className="text-lg font-semibold text-slate-800">
          Dashboard
        </h2>

        <p className="hidden text-sm text-slate-500 sm:block">
          Welcome back to MediCare
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
          🔔
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
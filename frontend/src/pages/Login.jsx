import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();    

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        {
          username: username,
          password: password,
        }
      );

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Hospital Management System
        </h1>

        <h2 className="text-xl font-semibold mb-4">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
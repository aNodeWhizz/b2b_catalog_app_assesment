import { useState } from "react";
import "../Login.css";
import ENDPOINT from "../constants/endpoint";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(ENDPOINT.LOGIN, {
        username,
        password,
      });
      if (data?.data) {
        localStorage.setItem("authToken", data.data);
        navigate("/product");
      } else {
        setError("Invalid credentials. Please try again.");
      }
      // Handle successful login (e.g., redirect)
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid credentials. Please try again."); // Display error message
    }
  };

  if (token) {
    return <Navigate to="/product" />;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>B2B Catalog App Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-control">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/welcome.css";
import { UserContext } from "./userContext";

function Welcome() {
  const ServerUrl = process.env.REACT_APP_API_URL;
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { userName, setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${ServerUrl}/api/check-name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      console.log(response, "response");

      if (response.ok) {
        setUser(name);
        console.log("Navigating to /landing");
        navigate("/landing");
        setError(""); // Clear error if login is successful
      } else {
        // Show error message from the server
        setError(data.error);
      }
    } catch (err) {
      // Handle network or other errors
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1 className="heading">Welcome to KudoSpot</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your name"
            className="input-box"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br /> <br />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Welcome;

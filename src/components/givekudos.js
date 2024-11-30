import React, { useState, useEffect, useContext } from "react";
import "../styles/givekudos.css";
import { UserContext } from "./userContext";

function GiveKudos() {
  const ServerUrl = process.env.REACT_APP_API_URL;
  const { userName, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [badges, setBadges] = useState([
    "Helping Hand",
    "Excellence",
    "Above and beyond",
    "Client Focus",
  ]);
  const [formData, setFormData] = useState({
    sender: `${userName}`,
    receiver: "",
    badge: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${ServerUrl}/api/kudos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({
      sender: `${userName}`,
      receiver: "",
      badge: "",
      message: "",
    });
    alert("Kudos sent!");
  };

  useEffect(() => {
    const fetchAllUser = async () => {
      const response = await fetch(`${ServerUrl}/api/get-all-users`);

      const data = await response.json();

      const filterUser = data.filter((user) => user.name !== userName);
      setUsers(filterUser);
    };

    fetchAllUser();
  }, []);

  return (
    <div className="give-kudos-page">
      <form onSubmit={handleSubmit}>
        <select
          onChange={(e) =>
            setFormData({ ...formData, receiver: e.target.value })
          }
          className="select-box"
          value={formData.receiver}
        >
          <option value="" disabled>
            Select the user you want to give kudos to
          </option>
          {users.map((user) => (
            <option key={user._id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>

        <br />
        <br />
        <select
          onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
          className="select-box"
          value={formData.badge}
        >
          <option value="" disabled>
            select the Badge you want to give
          </option>

          {badges.map((badge) => (
            <option key={badge} value={badge}>
              {badge}{" "}
            </option>
          ))}
        </select>

        <br />
        <br />
        <textarea
          placeholder="Reason for Kudos "
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          value={formData.message}
          className="textarea-box"
        />
        <br />
        <br />
        <button type="submit" className="landing-buttons">
          Give Kudos
        </button>
      </form>
    </div>
  );
}

export default GiveKudos;

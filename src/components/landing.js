import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TfiSearch } from "react-icons/tfi";
import { IoAnalytics } from "react-icons/io5";
import Message from "./message";
import "../styles/landing.css";
import { UserContext } from "./userContext";

const Landing = () => {
  const ServerUrl = process.env.REACT_APP_API_URL;
  const { userName, setUser } = useContext(UserContext);
  const [name, setName] = useState(userName);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const handleAnalytics = () => {
    navigate("/analytics");
  };

  const handleGiveKudos = () => {
    navigate("/give-kudos");
  };

  useEffect(() => {
    const fetchAllMessages = async () => {
      const response = await fetch(`${ServerUrl}/api/get-all-messages`);

      const data = await response.json();

      console.log(data);

      setMessages(data);
    };

    fetchAllMessages();
  }, []);

  return (
    <div className="landing-page">
      <h1>Welcome , {name} </h1>

      <div>
        <div className="button-position">
          <button className="landing-buttons" onClick={handleGiveKudos}>
            Give Kudos
          </button>
        </div>

        <div className="messages-box">
          {messages.length > 0 ? (
            messages.map((message) => <Message messageDetails={message} />)
          ) : (
            <p className="no-message">No Messages </p>
          )}
        </div>
        <div className="button-position">
          <button className="landing-buttons" onClick={handleAnalytics}>
            <div>
              <TfiSearch style={{ width: "40px", height: "40px" }} />
              <div
                style={{ position: "relative", bottom: "40px", right: "5px" }}
              >
                <IoAnalytics style={{ width: "25px", height: "25px" }} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;

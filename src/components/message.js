import { PiHandHeartDuotone } from "react-icons/pi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useContext, useState } from "react";
import "../styles/message.css";
import { UserContext } from "./userContext";

const Message = ({ messageDetails }) => {
  const ServerUrl = process.env.REACT_APP_API_URL;
  const { userName, setUser } = useContext(UserContext);
  const [isLike, setIsLike] = useState(
    messageDetails.isLike.includes(userName) || false
  );

  const handleLike = async () => {
    if (!isLike) {
      try {
        await fetch(`${ServerUrl}/api/add-like`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kudosId: messageDetails._id, userName }),
        });
        setIsLike((prev) => !prev);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        await fetch(`${ServerUrl}/api/remove-like`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kudosId: messageDetails._id, userName }),
        });
        setIsLike((prev) => !prev);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <div className="message">
      <div className="icon-text">
        <PiHandHeartDuotone
          style={{ width: "40px", height: "40px", marginRight: "10px" }}
        />

        <p>
          {messageDetails.sender === userName
            ? "You "
            : `${messageDetails.sender} `}
          give {messageDetails.badge} to{" "}
          {messageDetails.receiver === userName
            ? "you "
            : `${messageDetails.receiver} `}
        </p>
      </div>
      <p className="message-reason">{messageDetails.message} </p>
      <div className="like-button-container">
        <button className="like-button" onClick={handleLike}>
          {isLike ? (
            <FaHeart style={{ color: "red", width: "40px", height: "40px" }} />
          ) : (
            <FaRegHeart
              style={{ color: "red", width: "40px", height: "40px" }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Message;

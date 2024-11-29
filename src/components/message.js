import { PiHandHeartDuotone } from "react-icons/pi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useContext, useState } from "react";
import "../styles/message.css";
import { UserContext } from "./userContext";

const Message = ({ messageDetails }) => {
  const { userName, setUser } = useContext(UserContext);
  const [isLike, setIsLike] = useState(false);

  const handleLike = () => {
    setIsLike((prev) => !prev);
  };
  return (
    <div className="message">
      <div className="icon-text">
        <PiHandHeartDuotone
          style={{ width: "40px", height: "40px", marginRight: "10px" }}
        />

        <p>
          {messageDetails.sender === userName ? "You" : messageDetails.name}
          give helping hand to {messageDetails.receiver}
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

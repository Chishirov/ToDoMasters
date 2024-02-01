import React, { useContext, useEffect, useState } from "react";
import "../styles/workFlowCard.css";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

function WorkFlowCard({ titleName }) {
  const {
    hasToken,
    setHasToken,
    error,
    setError,
    msg,
    setMsg,
    user,
    setUser,
    backendApiUrl,
    userId,
    setUserId,
  } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [klicked, setKlicked] = useState(false);
  const [text, setText] = useState("");

  console.log(userId);

  const handelKlick = () => {
    setKlicked(true);
  };
  const getUserByIdHandler = async () => {
    if (userId) {
      try {
        const resp = await axios.get(`${backendApiUrl}/user/${user._id}`, {
          withCredentials: true,
        });

        console.log("Server response:", resp.data);

        setItems(resp.data.items);
      } catch (error) {
        console.error("Error fetching user data:", error);

        // Log additional details about the error
        if (error.response) {
          console.error("Server responded with:", error.response.data);
        } else if (error.request) {
          console.error("No response received. Request made:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }
    }
  };

  // Filter items based on the current category

  const handelSavedTexts = async () => {
    console.log("Inside handelSavedTexts");
    const value = text.trim(); // Remove leading and trailing whitespaces
    if (value !== "") {
      console.log("user._id", user._id);
      try {
        const response = await axios.post(
          `${backendApiUrl}/postitem/${userId}`,
          { title: value, category: titleName },
          { withCredentials: true }
        );

        console.log("Server response after adding item:", response.data);

        setText(""); // Clear the input field
        setKlicked(false); // Close the input field after saving the text

        await getUserByIdHandler();
        // setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const filteredItems = items.filter((item) => item.category === titleName);
  useEffect(() => {
    const fetchData = async () => {
      await getUserByIdHandler();
    };
    fetchData();
  }, [hasToken]);
  console.log(items);
  return (
    <>
      {hasToken && (
        <div className="card1">
          <p className="card-title">{titleName} </p>
          <div className="card-conetnt">
            <div className="card-image"></div>
            {filteredItems.length > 0 && (
              <ul className="card-list">
                {filteredItems.map((item, index) => (
                  <li key={index}>{item.title}</li>
                ))}
              </ul>
            )}
          </div>
          {klicked && (
            <div className="card-body">
              <input
                placeholder="Enter a Title for this card..."
                className="input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          )}
          {klicked ? (
            <div className="adding-card">
              <button onClick={() => handelSavedTexts()}>add</button>
              <button onClick={() => setKlicked(false)}>close</button>
            </div>
          ) : (
            <div className="add-to-card">
              <button onClick={handelKlick}>
                <i
                  className="fa-solid fa-plus"
                  style={{ color: "#b3b3b3", paddingRight: "10px" }}
                ></i>
                <span style={{ color: "#b3b3b3" }}> add a card</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default WorkFlowCard;

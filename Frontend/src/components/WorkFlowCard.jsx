import React, { useContext, useEffect, useState } from "react";
import "./styles/workFlowCard.css";
import axios from "axios";
import { UserContext } from "./context/UserContext.jsx";

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
    userId,
    setUserId,
  } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [klicked, setKlicked] = useState(false);
  const [text, setText] = useState("");
  const backendApiUrl = "http://localhost:4001/api";
  console.log(userId);

  const handelKlick = () => {
    setKlicked(true);
  };
  const getUserByIdHandler = async () => {
    if (userId) {
      try {
        const resp = await axios.get(`${backendApiUrl}/user/${userId}`, {
          withCredentials: true,
        });

        console.log("User data by ID:", resp.data.userData);
        console.log("user in work flow: ", user);
        setItems(resp.data.userData.items);
        console.log("user.items:", user.items);
        // Handle the user data as needed, e.g., update state
      } catch (error) {
        console.log(error);
      }
    }
  };
  // Filter items based on the current category

  const handelSavedTexts = async () => {
    console.log("Inside handelSavedTexts");
    const value = text.trim(); // Remove leading and trailing whitespaces
    if (value !== "") {
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

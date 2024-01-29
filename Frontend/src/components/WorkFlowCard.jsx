import React, { useEffect, useState } from "react";
import "../styles/workFlowCard.css";
import axios from "axios";

function WorkFlowCard({ title }) {
  const [klicked, setKlicked] = useState(false);
  const [text, setText] = useState("");
  const [savedTexts, setSavedTexts] = useState([]);
  const userId = "";

  const handelKlick = () => {
    setKlicked(true);
  };

  const handelSavedTexts = () => {
    const value = text.trim(); // Remove leading and trailing whitespaces
    if (value !== "") {
      setSavedTexts([...savedTexts, value]);
      setText(""); // Clear the input field
      setKlicked(false); // Close the input field after saving the text
    }
  };

  useEffect(() => {
    handelSavedTexts();
    console.log("savedTexts updated:", savedTexts);
  }, [savedTexts]);

  return (
    <>
      <div className="card1">
        <p className="card-title">{title} </p>
        <div className="card-conetnt">
          <div className="card-image"></div>
          {savedTexts.length > 0 && (
            <ul className="card-list">
              {savedTexts.map((savedText, index) => (
                <li key={index}>{savedText}</li>
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
            <button onClick={handelSavedTexts}>add</button>
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
    </>
  );
}

export default WorkFlowCard;

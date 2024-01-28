import React, { useEffect, useState } from "react";
import "../styles/workFlowCard.css";

// eslint-disable-next-line react/prop-types
function WorkFlowCard({ title }) {
  const [klicked, setKlicked] = useState(false);
  const [savedItem, setSavedItem] = useState(false);
  const [text, setText] = useState("");
  const [savedTexts, setSavedTexts] = useState([]);

  //   console.log("text-input: ", text);

  const handelKlick = () => {
    setKlicked(true);
  };

  const handelSavedTexts = () => {
    const value = text;
    setSavedTexts([...savedTexts, value]);
    console.log("savedTexts: ", savedTexts);
    setText(""); // Clear the input field
    setKlicked(false); // Close the input field after saving the text
    setSavedItem(true);
  };

  useEffect(() => {
    // You can set an initial value for the text state here if needed
    // setText("Initial value");
  }, []);

  return (
    <>
      <div className="card1">
        <p className="card-title">{title} </p>
        <div className="card-conetnt">
          <div className="card-image"></div>
          {/* Display the saved values as a list */}
          {savedItem && (
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

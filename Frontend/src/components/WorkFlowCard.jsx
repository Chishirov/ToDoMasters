// WorkFlowCard.jsx
import React, { useContext, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes"; // Import the ItemTypes
import axios from "axios";
import { UserContext } from "../context/UserContext";
import DraggableItem from "./DraggableItem"; // Import the DraggableItem component
import "../styles/workFlowCard.css";
function WorkFlowCard({ titleName }) {
  const { hasToken, backendApiUrl, userId } = useContext(UserContext);

  const [items, setItems] = useState([]);
  const [klicked, setKlicked] = useState(false);
  const [text, setText] = useState("");

  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (item) => handleDrop(item),
  });

  const handleDrop = async (item) => {
    try {
      // Update the category of the item in the backend
      const response = await axios.put(
        `${backendApiUrl}/updateItemCategory/${userId}/${item.itemId}`, // Adjust the API endpoint accordingly
        { category: titleName },
        { withCredentials: true }
      );
      console.log("drag response: ", response.data);
      // Update the state with the new data
      await getUserByIdHandler();
    } catch (error) {
      console.error("Error updating item category:", error);
    }
  };

  const handelKlick = () => {
    setKlicked(true);
  };

  const getUserByIdHandler = async () => {
    if (userId) {
      try {
        const resp = await axios.get(`${backendApiUrl}/user/${userId}`, {
          withCredentials: true,
        });

        setItems(resp.data.items);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const handelSavedTexts = async () => {
    const value = text.trim();
    if (value !== "") {
      try {
        const response = await axios.post(
          `${backendApiUrl}/postitem/${userId}`,
          { title: value, category: titleName },
          { withCredentials: true }
        );

        setText("");
        setKlicked(false);
        await getUserByIdHandler();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserByIdHandler();
    };
    fetchData();
  }, [hasToken, titleName, items]);

  return (
    <>
      {hasToken && (
        <div className="card1" ref={drop}>
          <p className="card-title">{titleName} </p>
          <div className="card-conetnt">
            <div className="card-image"></div>
            {items
              .filter((item) => item.category === titleName)
              .map((item, index) => (
                <DraggableItem
                  key={index}
                  title={item.title}
                  category={item.category}
                  itemId={item._id} // Add the item ID to identify it uniquely
                />
              ))}
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

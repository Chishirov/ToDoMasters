// workFlowCard.js

import React, { useContext, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import DraggableItem from "./DraggableItem";
import "../styles/workFlowCard.css";

function WorkFlowCard({ titleName }) {
  const { hasToken, backendApiUrl, userId } = useContext(UserContext);

  const [items, setItems] = useState([]);
  const [klicked, setKlicked] = useState(false);
  const [text, setText] = useState("");
  const [itemId, setItemId] = useState(null);

  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (item) => handleDrop(item),
  });

  const handleDrop = async (item) => {
    try {
      const response = await axios.put(
        `${backendApiUrl}/updateItemCategory/${userId}/${item.itemId}`,
        { category: titleName },
        { withCredentials: true }
      );
      console.log("drag response: ", response.data);
      await getUserByIdHandler();
    } catch (error) {
      console.error("Error updating item category:", error);
    }
  };

  const handelKlick = () => {
    setKlicked(true);
    setItemId(null);
  };

  const handleUpdateItem = async (itemId) => {
    try {
      const currentItem = items.find((item) => item._id === itemId);
      setText(currentItem ? currentItem.title : "");
      setKlicked(true);
      setItemId(itemId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `${backendApiUrl}/users/${userId}/items/${itemId}`,
        { withCredentials: true }
      );
      console.log("Server response after deleting item:", response.data);

      await getUserByIdHandler();
    } catch (error) {
      console.log(error);
    }
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
        if (itemId !== null) {
          const response = await axios.put(
            `${backendApiUrl}/users/${userId}/items/${itemId}`,
            { title: value },
            { withCredentials: true }
          );
          console.log("Server response after updating item:", response.data);
        } else {
          const response = await axios.post(
            `${backendApiUrl}/postitem/${userId}`,
            { title: value, category: titleName },
            { withCredentials: true }
          );
          console.log("Server response after adding item:", response.data);
        }

        setText("");
        setKlicked(false);
        setItemId(null);

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
                <div key={index} className="item-container">
                  <DraggableItem
                    title={item.title}
                    category={item.category}
                    itemId={item._id}
                  />
                  <div className="button-container">
                    <button
                      className="update-button"
                      onClick={() => handleUpdateItem(item._id)}
                    >
                      <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
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
              <button onClick={() => handelSavedTexts()}>Save</button>
              <button onClick={() => setKlicked(false)}>Cancel</button>
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

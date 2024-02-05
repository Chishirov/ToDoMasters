// WorkFlowPage.jsx
import React, { useContext, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WorkFlowCard from "./WorkFlowCard.jsx";
import "../styles/workflowPage.css";
import DropDown from "./DropDown.jsx";
import todo from "../images/todo.jpg";
import brainstorm from "../images/brainstorm.jpeg";
import doing from "../images/doing.jpeg";
import done from "../images/done.jpeg";
import { UserContext } from "../context/UserContext.jsx";
import axios from "axios";

function WorkFlowPage() {
  const titles = ["BRAINSTORM 🤔", "TODO 📚", "DOING ⚙️", "DONE 🙌🏽"];
  const images = [brainstorm, todo, doing, done];
  const { users, setUsers, backendApiUrl } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendApiUrl}/users`);
        console.log(response);

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after mount
  console.log(users);
  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <div className="main-navbar">
          <DropDown />
        </div>
        <div className="main-container">
          <div className="left-main-container">
            <h4>Your boards</h4>
            <h5>💻 Code Club</h5>
          </div>
          <div className="header-box">
            <div className="card-header">
              <div className="title-card-header">
                <h5>Code Club</h5>
              </div>
              <div className="allUsers-container">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="tooltip-container allUsers-box"
                  >
                    <span className="text ">
                      {user.name[0].toUpperCase() + user.name.slice(1, 2)}
                    </span>
                    <span className="tooltip">{user.email}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="tooltip-container">
                  <span className="text">
                    <div className="flowcard-header-users">
                      <button className="btn-style hover">
                        <i className="fa-solid fa-user-plus"> </i>
                        Share
                      </button>
                    </div>
                  </span>
                  <span className="tooltip">Coming Soon ...</span>
                </div>
              </div>
            </div>
            <div className="workflow-container">
              {titles.map((title, index) => (
                <WorkFlowCard
                  key={index}
                  titleName={title}
                  image={images[index]}
                />
              ))}
              <div className="tooltip-container add-another-list">
                <span className="text">+ Add another list</span>
                <span className="tooltip">Coming Soon ...</span>
              </div>
            </div>
          </div>
        </div>
      </>
    </DndProvider>
  );
}

export default WorkFlowPage;

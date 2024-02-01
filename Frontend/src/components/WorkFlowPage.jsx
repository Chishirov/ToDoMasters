import React from "react";
import WorkFlowCard from "./WorkFlowCard.jsx";
import "../styles/workflowPage.css";
import Logout from "./Logout.jsx";
function WorkFlowPage() {
  const titles = ["BRAINSTORM 🤔", "TODO 📚", "DOING ⚙️", "DONE 🙌🏽"];

  return (
    <>
      <div className="main-navbar">
        <Logout />
      </div>
      <div className="main-container">
        <div className="left-main-container">
          <h4>Your boards</h4>
        </div>
        <div className="ca-container">
          <div className="card-header"></div>
          <div className="workflow-container">
            {titles.map((title, index) => (
              <WorkFlowCard key={index} titleName={title} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkFlowPage;

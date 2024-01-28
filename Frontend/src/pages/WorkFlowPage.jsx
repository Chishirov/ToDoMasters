import React from "react";
import WorkFlowCard from "../components/WorkFlowCard";
import "../styles/workflowPage.css";
function WorkFlowPage() {
  return (
    <div className="workflow-container">
      <WorkFlowCard title="BRAINSTORM" />
      <WorkFlowCard title="TODO" />
      <WorkFlowCard title="DOING" />
      <WorkFlowCard title="DONE" />
    </div>
  );
}

export default WorkFlowPage;

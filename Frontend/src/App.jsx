import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/loginPage.jsx";
import WorkFlowCard from "./components/WorkFlowCard.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <LoginPage /> */}
      <WorkFlowCard />
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/loginPage.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LoginPage />
    </>
  );
}

export default App;

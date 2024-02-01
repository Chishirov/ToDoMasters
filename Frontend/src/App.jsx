
import "./App.css";
import Login from "./components/Login.jsx";
import { useContext, useEffect, useState } from "react";
import cookie from "js-cookie"; // cookie parser

import WorkFlowPage from "./components/WorkFlowPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext.jsx";

function App() {
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

  const handleIfUserHasToken = () => {
    console.log("handleIfUserHasToken aufgerufen");

    let JWTinfocookie = cookie.get("JWTinfo");

    console.log("JWTinfo cookie", JWTinfocookie);
    if (!JWTinfocookie) return;

    JWTinfocookie = JWTinfocookie.replace("j:", "");
    const cookieValueObj = JSON.parse(JWTinfocookie);
    console.log("cookieValueObj", cookieValueObj);
    setUserId(cookieValueObj.user._id);

    const expirationInMs = new Date(cookieValueObj.expires) - new Date();
    console.log("JWT läuft ab in", expirationInMs / 1000, "Sekunden");

    if (expirationInMs <= 0) return;

    setHasToken(true);
    setUser(cookieValueObj.user);
    setMsg(`Eingeloggter User: ${cookieValueObj.email}.`);
  };
  useEffect(() => {
    const fetchData = async () => {
      await handleIfUserHasToken();
    };
    fetchData();
  }, [hasToken]);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/workflow" element={<WorkFlowPage />} />
          {/* Define other routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

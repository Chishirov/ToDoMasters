import React from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import "../styles/home.css";
function Home() {
  const navigate = useNavigate();
  return (
    <>
      {/* <button
          onClick={() => navigate("/login")}
          style={{ background: "initial", border: "1px solid" }}
        >
          Login
        </button> */}
      <div className="home-login-button">
        <LoginButton />
      </div>

      <div>
        <button
          onClick={() => navigate("/signup")}
          style={{ background: "initial", border: "1px solid" }}
        >
          Sugnup
        </button>
      </div>
    </>
  );
}

export default Home;

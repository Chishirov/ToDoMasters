import React from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import "../styles/home.css";
import IntroAnimation from "../components/IntroAnimation";
import LogoutButton from "../components/LogoutButton";
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

      <div className="home-box">
        <div className="text-animation">
          <IntroAnimation />
        </div>
      </div>
      <LogoutButton />
    </>
  );
}

export default Home;

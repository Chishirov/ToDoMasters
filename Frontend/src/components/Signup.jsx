import { useContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const {
    setMsg,
    setError,
    backendApiUrl,
    user,
    setHasToken,
    setUser,
    setUserId,
  } = useContext(UserContext);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const resetMessages = () => {
    setMsg("");
    setError("");
    setPasswordError("");
  };

  const resetNameEmailErrors = () => {
    setNameError("");
    setEmailError("");
  };

  const setErrorMessages = (error) => {
    if (error.response) {
      setError(error.response.data.error);
    } else {
      setError(error.message);
    }
  };

  const isNameValid = (name) => {
    if (name.trim() === "") {
      setNameError("Der Name darf nicht leer sein.");
      return false;
    }
    return true;
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Die E-Mail-Adresse ist ungültig.");
      return false;
    }
    return true;
  };

  const isPasswordValid = (password) => {
    const minLength = 8;

    if (password.length < minLength) {
      setPasswordError("Das Passwort muss mindestens 8 Zeichen lang sein.");
      return false;
    }

    if (!/\d/.test(password)) {
      setPasswordError("Das Passwort muss mindestens eine Zahl enthalten.");
      return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError(
        "Das Passwort muss mindestens ein Sonderzeichen enthalten."
      );
      return false;
    }

    return true;
  };

  const signUpHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    resetMessages();
    resetNameEmailErrors();

    if (
      !isNameValid(name) ||
      !isEmailValid(email) ||
      !isPasswordValid(password)
    ) {
      return;
    }

    try {
      const resp = await axios.post(`${backendApiUrl}/signup`, {
        name,
        email,
        password,
      });

      console.log("Erfolgreich registriert:", resp.data);
      setMsg("Du hast dich erfolgreich registriert.");
      navigate("/login");
    } catch (error) {
      setErrorMessages(error);
      console.log("Fehler beim Anmelden:", error);
    }
  };

  useEffect(() => {
    const handleIfUserHasToken = async () => {
      let JWTinfocookie = cookie.get("JWTinfo");

      if (!JWTinfocookie) return;

      JWTinfocookie = JWTinfocookie.replace("j:", "");
      const cookieValueObj = JSON.parse(JWTinfocookie);
      setUserId(cookieValueObj.user._id);

      const expirationInMs = new Date(cookieValueObj.expires) - new Date();

      if (expirationInMs <= 0) return;

      setHasToken(true);
      setUser(cookieValueObj.user);
      setMsg(`Eingeloggter User: ${cookieValueObj.email}.`);
    };

    handleIfUserHasToken();
  }, [setHasToken, setUser, setUserId, setMsg]);

  return (
    <>
      <div className="login-box">
        <p>Signup</p>
        <form onSubmit={signUpHandler}>
          <div className="user-box">
            <input
              required=""
              placeholder="Enter your Name"
              id="name"
              name="name"
              type="text"
            />
            <label htmlFor="name">Name</label>
          </div>
          {nameError && (
            <p className="error-message" style={{ color: "orange" }}>
              {nameError}
            </p>
          )}
          <div className="user-box">
            <input
              required=""
              placeholder="Enter your email"
              id="email"
              name="email"
              type="email"
            />
            <label htmlFor="email">Email</label>
          </div>
          {emailError && (
            <p className="error-message" style={{ color: "orange" }}>
              {emailError}
            </p>
          )}
          <div className="user-box">
            <input
              required=""
              placeholder="Enter your password"
              id="password"
              name="password"
              type="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          {passwordError && (
            <p className="error-message" style={{ color: "orange" }}>
              {passwordError}
            </p>
          )}
          <button type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;

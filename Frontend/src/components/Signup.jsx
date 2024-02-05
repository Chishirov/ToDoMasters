import { useContext, useEffect, useState } from "react";
import cookie from "js-cookie"; // cookie parser
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
function Login() {
  const navigate = useNavigate();
  const {
    hasToken,
    setHasToken,
    error,
    setError,
    msg,
    setMsg,
    backendApiUrl,
    user,
    setUser,
    userId,
    setUserId,
  } = useContext(UserContext);

  console.log("userId", userId);

  const resetMessages = () => {
    setMsg("");
    setError("");
  };

  const setErrorMessages = (error) => {
    if (error.response) {
      setError(error.response.data.error);
    } else {
      setError(error.message);
    }
  };

  const signUpHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    resetMessages();

    try {
      const resp = await axios.post(`${backendApiUrl}/signup`, {
        name,
        email,
        password,
      });

      console.log("Erfolgreich registriert:", resp.data);
      setMsg("Du hast dich erfolgreich registriert.");
      navigate("/");
      // setRerender((prev) => !prev); // Force re-render
    } catch (error) {
      setErrorMessages(error);
      console.log("error while signing up:", error);
    }
  };

  // const loginHandler = async (e) => {
  //   e.preventDefault();

  //   const form = e.target;
  //   const email = form.email.value;
  //   const password = form.password.value;

  //   resetMessages();

  //   try {
  //     const resp = await axios.post(
  //       `${backendApiUrl}/login`,
  //       {
  //         email,
  //         password,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     console.log("resp: ", resp.data.msg);
  //     setMsg(`Erfolgreich eingeloggt: ${email}. JWT erhalten.`);
  //     setHasToken(true);

  //     navigate("/workflow");
  //     // setRerender((prev) => !prev); // Force re-render
  //   } catch (error) {
  //     setErrorMessages(error);
  //     console.log("error while logging in:", error);
  //   }
  // };

  // const logoutHandler = async (e) => {
  //   e.preventDefault();

  //   resetMessages();

  //   try {
  //     const resp = await axios.post(
  //       `${backendApiUrl}/logout`,
  //       {},
  //       { withCredentials: true }
  //     );

  //     console.log("Erfolgreich ausgeloggt", resp.data);
  //     setMsg("Erfolgreich ausgeloggt.");
  //     setHasToken(false);
  //     // setRerender((prev) => !prev); // Force re-render
  //   } catch (error) {
  //     setErrorMessages(error);
  //   }
  // };

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

  const userInfoHandler = async () => {
    resetMessages();

    try {
      const resp = await axios.get(`${backendApiUrl}/userinfo`, {
        withCredentials: true,
      });
      console.log("resp.data:", resp.data);
      setMsg(resp.data);
    } catch (error) {
      setErrorMessages(error);
    }
  };
  console.log("userId---", userId);
  console.log("user._id---", user._id);
  const getUserByIdHandler = async () => {
    resetMessages();
    if (userId) {
      try {
        const resp = await axios.get(`${backendApiUrl}/user/${user._id}`, {
          withCredentials: true,
        });

        console.log("User data by ID:", resp.data);
        // Handle the user data as needed, e.g., update state
      } catch (error) {
        setErrorMessages(error);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await handleIfUserHasToken();
    };
    fetchData();
  }, [hasToken]); // Dependency added for re-render

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
          <button type="submit" className="btn-style">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
        {/* <p>
        Now you have an account! <Link to="/">Log in!</Link>
      </p> */}
      </div>
    </>
  );
}

export default Login;

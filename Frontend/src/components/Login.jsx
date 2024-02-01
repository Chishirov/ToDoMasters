import React, { useContext, useEffect } from "react";
import cookie from "js-cookie";
import { UserContext } from "../context/Context";
import axios from "axios";
function Login() {
  const {
    userId,
    setUserId,
    hasToken,
    backendApiUrl,
    setUser,
    setHasToken,
    setMsg,
    setErrorMessages,
    resetMessages,
  } = useContext(UserContext);
  console.log("userId", userId);
  const loginHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    resetMessages();

    try {
      const resp = await axios.post(
        `${backendApiUrl}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setMsg(`Erfolgreich eingeloggt: ${email}. JWT erhalten.`);

      setHasToken(true);
      setUser({ email });
      // navigate("/workflow");
      // setRerender((prev) => !prev); // Force re-render
    } catch (error) {
      setErrorMessages(error);
      console.log("error while logging in:", error);
    }
  };
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
    setUser({ email: cookieValueObj.email });
    setMsg(`Eingeloggter User: ${cookieValueObj.email}.`);
  };

  // const userInfoHandler = async () => {
  //   resetMessages();

  //   try {
  //     const resp = await axios.get(`${backendApiUrl}/userinfo`, {
  //       withCredentials: true,
  //     });
  //     console.log("resp.data:", resp.data);
  //     setMsg(resp.data);
  //   } catch (error) {
  //     setErrorMessages(error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      await handleIfUserHasToken();
    };
    fetchData();
  }, [hasToken]);

  return (
    <div className="form_area">
      <div>
        {!hasToken ? (
          <>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" />
              <br />
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" />
              <br />
              <button type="submit">Log In</button>
            </form>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Login;

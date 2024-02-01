import React, { useContext } from "react";
import { UserContext } from "../context/Context";
import axios from "axios";

function Signup() {
  const {
    hasToken,
    error,
    msg,
    backendApiUrl,
    resetMessages,
    setErrorMessages,
    setMsg,
    setUser,
  } = useContext(UserContext);

  const signUpHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    console.log(form.value);
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
      // setRerender((prev) => !prev); // Force re-render
    } catch (error) {
      setErrorMessages(error);
      console.log("error while signing up:", error);
    }
  };
  return (
    <div className="form_area">
      <p style={{ color: "orange" }}>
        DEBUG-Message: {hasToken ? "User is logged in." : "Not logged in!!!"}
      </p>
      <p className="info">
        <span style={{ color: "red", fontSize: "0.7rem" }}>{error}</span>{" "}
        <span>{msg}</span>
      </p>
      <div>
        {!hasToken ? (
          <>
            <h2>Sign Up</h2>
            <form onSubmit={signUpHandler}>
              <label htmlFor="name">Name: </label>
              <input type="name" name="name" />
              <br />
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" />
              <br />
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" />
              <br />
              <button type="submit">Sign Up</button>
            </form>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Signup;

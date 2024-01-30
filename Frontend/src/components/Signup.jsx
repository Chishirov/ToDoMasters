import React, { useContext } from "react";
import { Context } from "../context/Context";

function Signup() {
  const {
    hasToken,
    error,
    msg,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    backendApiUrl,
    resetMessages,
    setErrorMessages,
    setIsLoggedIn,
    setMsg,
    setUser,
  } = useContext(Context);

  const handleSignup = async (e) => {
    console.log("handleSignup ausgefühlt");
    e.preventDefault();
    resetMessages();
    try {
      const response = await axios.post(`${backendApiUrl}/signup`, {
        email,
        password,
        name: username,
      });
      // const response = await axios.post(`http://localhost:3005/signup`, { email, password, name: username });
      setUser(response.data.user);
      setMsg("You have successfully registered.");
      setIsLoggedIn(true);
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
          <div className="form_group">
            <h3 className="title sub_title">Signup</h3>
            <label className="sub_title" htmlFor="username">
              Username:
            </label>
            <input
              className="form_style"
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label className="sub_title" htmlFor="email">
              Email:
            </label>
            <input
              className="form_style"
              placeholder="Enter your email"
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label className="sub_title" htmlFor="password">
              Password:
            </label>
            <input
              className="form_style"
              placeholder="Enter your password"
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div className="btn">
              <button onClick={handleSignup}>Signup</button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Signup;

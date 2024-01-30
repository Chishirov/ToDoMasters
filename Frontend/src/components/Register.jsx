import React, { useContext } from "react";
import { Context } from "../context/Context";

function Register() {
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
    handleSignup,
  } = useContext(Context);
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
            <h3 className="title sub_title">Register</h3>
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
              <button onClick={handleSignup}>Register</button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Register;

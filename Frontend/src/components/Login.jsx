import React, { useContext } from "react";
import { Context } from "../context/Context";

function Login() {
  const { hasToken, email, setEmail, password, setPassword, handleLogin } =
    useContext(Context);
  return (
    <div className="form_area">
      <div>
        {!hasToken ? (
          <div className="form_group">
            <h3>Login</h3>
            <label className="sub_title" htmlFor="email">
              Email:
            </label>
            <input
              className="form_style"
              placeholder="Enter your email"
              id="email login"
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
              id="password login"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div className="btn">
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Login;

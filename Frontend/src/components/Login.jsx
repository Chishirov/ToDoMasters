import React, { useContext } from "react";
import { Context } from "../context/Context";

function Login() {
  const {
    hasToken,
    email,
    setEmail,
    password,
    setPassword,
    setUser,
    setHasToken,
    setIsLoggedIn,
    setMsg,
    setErrorMessages,
    resetMessages,
  } = useContext(Context);

  const handleLogin = async (e) => {
    console.log("handleLogin ausgefühlt");
    e.preventDefault();
    resetMessages();
    try {
      const response = await axios.post(
        `${backendApiUrl}/login`,
        { email: email, password: password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      setHasToken(true);
      setIsLoggedIn(true);
      setMsg(`You have successfully logged in: ${email}. JWT received.`);
      console.log("email in handleLogin", email);
      console.log("password in handleLogin", password);
    } catch (error) {
      setErrorMessages(error);
      console.log("error while logging in:", error);
    }
  };

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

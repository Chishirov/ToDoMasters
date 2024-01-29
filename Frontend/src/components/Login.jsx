import { useState } from "react";
import axios from "axios";

const Login = ({ setHasToken }) => {
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");
  const [setError] = useState("");
  const [setMsg] = useState("");
  const [setUser] = useState({});

  const resetMessages = () => {
    setMsg("");
    setError("");
  };

  const setErrorMessages = (error) => {
    // debugger;
    if (error.response) {
      setError(error.response.data.error);
    } else {
      setError(error.message);
    }
  };

  /* loginHandler */
  const loginHandler = async (e) => {
    e.preventDefault();
    resetMessages();
    try {
      const resp = await axios.post(
        "http://localhost:3005/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setMsg(`Erfolgreich eingeloggt: ${email}. JWT erhalten.`);
      // User State auf eingeloggt setzen
      // (hier sollten wir eigentlich überprüfen, ob das JWTinfo Cookie tatsächlich angekommen ist)
      setHasToken(true);
      setUser({ email }); // So können wir auch in der UI anzeigen, wer eingeloggt ist
    } catch (error) {
      // oder etwas komplexer und genauer
      setErrorMessages(error);
      console.log("error while signing up:", error);
    }
  };
  return (
            <div className="form_group">
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
    </div>
  );

  export default Login;
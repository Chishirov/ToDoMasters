import { useState, useEffect } from "react";
import axios from "axios";
function loginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logemail, setlogEmail] = useState("");
  const [logpassword, setlogPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3005/login",
        {
          email: logemail,
          password: logpassword,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Server Response Data:", response.data);
      setUser(response.data.user);
    } catch (error) {
      if (error.response) {
        console.error("Fehlerhafte Serverantwort:", error.response.data);
      } else if (error.request) {
        console.error("Keine Antwort vom Server erhalten:", error.request);
      } else {
        console.error("Fehler beim Einloggen:", error.message);
      }
    }
  };
  useEffect(() => {
    console.log("user:", user);
  }, [setUser]);
  console.log(user);
  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3005/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      if (response.status === 201) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error("Fehler beim Registrieren:", response.statusText);
      }
    } catch (error) {
      console.error("Fehler beim Registrieren:", error);
    }
  };
  return (
    <div>
      {user ? (
        <div>
          <h1>
            Willkommen,{" "}
            <div>{user?.name ?? "Benutzername nicht verfügbar"}</div>!
            {/* {<p>{user.name} </p>} */}
          </h1>
          {/* Hier könntest du die Todo-Logik hinzufügen */}
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={logemail}
            onChange={(e) => setlogEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passwort"
            value={logpassword}
            onChange={(e) => setlogPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <h1>Registrieren</h1>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignup}>Registrieren</button>
        </div>
      )}
    </div>
  );
}

export default loginPage;

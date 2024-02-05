import React, { useState } from "react";
import axios from "axios";

const TodoApp = ({ updateToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logemail, setlogEmail] = useState("");
  const [logpassword, setlogPassword] = useState("");
  // const [token , setToken] = useState("");
  const [user, setUser] = useState(null);

  //   const handleLogin = async () => {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3005/login",
  //         {
  //           email: logemail,
  //           password: logpassword,
  //         },
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       const tokenFromServer = response.data.token;
  //       console.log("Token from Server:", tokenFromServer);
  //       // Manuell das 'token'-Cookie setzen (falls erforderlich)
  //       document.cookie = `token=${tokenFromServer}; expires=${new Date(
  //         Date.now() + 86400000
  //       ).toUTCString()}; path=/`;
  //       updateToken(tokenFromServer);
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error("Fehler beim Einloggen:", error);
  //       setError("Fehler beim Einloggen.");
  //     }
  //   };
  //   const handleSignup = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3005/signup", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name: name,
  //           email: email,
  //           password: password,
  //         }),
  //       });
  //       if (response.status === 201) {
  //         const data = await response.json();
  //         console.log(data.message);
  //       } else {
  //         console.error("Fehler beim Registrieren:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Fehler beim Registrieren:", error);
  //     }
  //   };
  //   return (
  //     <div>
  //       {user ? (
  //         <div>
  //           <h1>Willkommen <div>{user?.name ?? "Benutzername nicht verfügbar"}</div>
  // !</h1>
  //         </div>
  //       ) : (
  //         <div>
  //           <h1>Login</h1>
  //           <input
  //             type="email"
  //             placeholder="Email"
  //             value={logemail}
  //             onChange={(e) => setlogEmail(e.target.value)}
  //           />
  //           <input
  //             type="password"
  //             placeholder="Passwort"
  //             value={logpassword}
  //             onChange={(e) => setlogPassword(e.target.value)}
  //           />
  //           <button onClick={handleLogin}>Login</button>
  //           <h1>Registrieren</h1>
  //           <input
  //             type="text"
  //             placeholder="Name"
  //             value={name}
  //             onChange={(e) => setName(e.target.value)}
  //           />
  //           <input
  //             type="email"
  //             placeholder="Email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //           />
  //           <input
  //             type="password"
  //             placeholder="Passwort"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //           <button onClick={handleSignup}>Registrieren</button>
  //         </div>
  //       )}
  //     </div>
  //   );
};
export default TodoApp;

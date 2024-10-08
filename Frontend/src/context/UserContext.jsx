import { createContext, useState } from "react";
import backendApiUrl from "../../config/config.js";
const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState();
  const [users, setUsers] = useState([]);
  console.log("user in context", user);

  // const backendApiUrl = "https://todo-8u90.onrender.com";
  return (
    <UserContext.Provider
      value={{
        user: user || {},
        setUser,
        error,
        setError,
        userId,
        setUserId,
        backendApiUrl,
        msg,
        setMsg,
        hasToken,
        setHasToken,
        users,
        setUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };

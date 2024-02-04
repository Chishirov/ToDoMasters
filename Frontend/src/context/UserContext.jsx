import { createContext, useState } from "react";

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState();
  const [users, setUsers] = useState([]);
  console.log("user in context", user);

  const backendApiUrl = "http://localhost:3005/api";
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

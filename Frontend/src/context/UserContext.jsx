import { createContext, useState } from "react";

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState();
  console.log("user in context", user);

  return (
    <UserContext.Provider
      value={{
        user: user || {},
        setUser,
        error,
        setError,
        userId,
        setUserId,

        msg,
        setMsg,
        hasToken,
        setHasToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };

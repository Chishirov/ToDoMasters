import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  // useState loginPage
  const [hasToken, setHasToken] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // useState WrokFlowCard
  const [klicked, setKlicked] = useState(false);
  const [text, setText] = useState("");
  const [savedTexts, setSavedTexts] = useState([]);

  // export useStates
  return (
    <Context.Provider
      value={{
        hasToken,
        setHasToken,
        error,
        setError,
        msg,
        setMsg,
        user,
        setUser,
        email,
        setEmail,
        username,
        setUsername,
        password,
        setPassword,
        isLoggedIn,
        setIsLoggedIn,
        formData,
        setFormData,
        klicked,
        setKlicked,
        text,
        setText,
        savedTexts,
        setSavedTexts,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };

// import variablen
/*
const { 
    Schrieb nur die benötigten Variablen, z.B. text, username
} = useContext(Context);
*/

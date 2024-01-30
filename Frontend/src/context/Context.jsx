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
  // URL
  const backendApiUrl = "http://localhost:3005";
  // functions
  const resetMessages = () => {
    setMsg("");
    setError("");
  };
  const setErrorMessages = (error) => {
    if (error.response) {
      setError(error.response.data.error);
    } else {
      setError(error.message);
    }
  };
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
        backendApiUrl,
        resetMessages,
        setErrorMessages,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };

// um variablen zu importieren
/*
const { 
    Schrieb nur die benötigten Variablen, z.B. text, username
} = useContext(Context);
*/

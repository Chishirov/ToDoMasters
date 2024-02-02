import React, { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  const {
    hasToken,
    // resetMessages,

    setMsg,
    setHasToken,
    setUser,
    setErrorMessages,
    backendApiUrl,
  } = useContext(UserContext);
  const logoutHandler = async (e) => {
    e.preventDefault();

    // resetMessages();

    try {
      const response = await axios.post(
        `${backendApiUrl}/logout`,
        {},
        { withCredentials: true }
      );

      setMsg("You have successfully logged out.", response.data);
      setMsg("Erfolgreich ausgeloggt.");
      setHasToken(false);
      setUser({});
      navigate("/");
      // setRerender((prev) => !prev); // Force re-render
    } catch (error) {
      // setErrorMessages(error);
      console.error({ messageError: error });
    }
  };

  return (
    <div className="form_area">
      {hasToken ? (
        <button className="btn" onClick={logoutHandler}>
          Logout
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Logout;

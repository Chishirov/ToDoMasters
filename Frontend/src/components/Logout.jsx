import React, { useContext } from "react";
import { UserContext } from "../context/Context";
import axios from "axios";
function Logout() {
  const {
    hasToken,
    resetMessages,
    setMsg,
    setHasToken,
    setUser,
    setErrorMessages,
    backendApiUrl,
  } = useContext(UserContext);
  const logoutHandler = async (e) => {
    e.preventDefault();

    resetMessages();

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
      // setRerender((prev) => !prev); // Force re-render
    } catch (error) {
      setErrorMessages(error);
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

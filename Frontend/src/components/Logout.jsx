import React, { useContext } from "react";
import { Context } from "../context/Context";

function Logout() {
  const {
    hasToken,
    resetMessages,
    setMsg,
    setHasToken,
    setIsLoggedIn,
    setUser,
    setErrorMessages,
  } = useContext(Context);
  const handleLogout = async () => {
    resetMessages();
    try {
      const response = await axios.post(
        `${backendApiUrl}/logout`,
        {},
        { withCredentials: true }
      );
      setMsg("You have successfully logged out.", response.data);
      setHasToken(false);
      setIsLoggedIn(false);
      setUser({});

      console.log("Logout successful:", response.data);
    } catch (error) {
      setErrorMessages(error);

      console.log("error while logging out:", error);
    }
  };

  return (
    <div className="form_area">
      {hasToken ? (
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Logout;

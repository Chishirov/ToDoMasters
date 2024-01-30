import React, { useContext } from "react";
import { Context } from "../context/Context";

function Logout() {
  const { hasToken, handleLogout } = useContext(Context);
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

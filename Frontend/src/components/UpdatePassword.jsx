import React, { useContext } from "react";
import { Context } from "../context/Context";

function UpdatePassword() {
  const { hasToken, password, setPassword, user } = useContext(Context);
  return (
    <div className="form_area">
      {hasToken ? (
        <div className="form_group">
          <p>Logged in as: {user?.email}</p>

          <label className="sub_title" htmlFor="password">
            New Password:
          </label>
          <input
            className="form_style"
            placeholder="Enter your password"
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" onClick={handlePasswordUpdate}>
            Update Password
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default UpdatePassword;

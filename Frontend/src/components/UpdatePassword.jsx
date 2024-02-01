import React, { useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

function UpdatePassword() {
  const {
    hasToken,
    password,
    setPassword,
    user,
    resetMessages,
    backendApiUrl,
    formData,
    setErrorMessages,
  } = useContext(UserContext);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    resetMessages();
    try {
      const response = await axios.put(
        `${backendApiUrl}/update-password`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Server Response:", response.data);
    } catch (error) {
      setErrorMessages(error);
      console.log("error while update-password:", error);
    }
  };

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

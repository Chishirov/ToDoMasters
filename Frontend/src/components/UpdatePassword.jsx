import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  const { hasToken, user, backendApiUrl } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${backendApiUrl}/update-password`,
        {
          email: user.email,
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      alert("Password updated successfully");
      navigate("/workflow");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="form_area">
      {hasToken ? (
        <div className="login-box">
          <p>Logged in as: {user?.email}</p>

          <label className="sub_title" htmlFor="currentPassword">
            Current Password:
          </label>
          <input
            className="form_style"
            placeholder="Enter your current password"
            id="currentPassword"
            name="currentPassword"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <label className="sub_title" htmlFor="newPassword">
            New Password:
          </label>
          <input
            className="form_style"
            placeholder="Enter your new password"
            id="newPassword"
            name="newPassword"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button onClick={handlePasswordUpdate}>Update Password</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default UpdatePassword;

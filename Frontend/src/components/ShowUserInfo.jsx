import React, { useContext } from "react";
import { Context } from "../context/Context";
import axios from "axios";

function ShowUserInfo() {
  const { hasToken, resetMessages, setMsg, setErrorMessages, backendApiUrl } =
    useContext(Context);

  const userInfoHandler = async () => {
    resetMessages();
    try {
      const resp = await axios.get(`${backendApiUrl}/userinfo`, {
        withCredentials: true,
      });
      console.log("resp-data:", resp.data);
      setMsg(resp.data);
    } catch (error) {
      setErrorMessages(error);
    }
  };
  return (
    <div>
      {hasToken ? (
        <button
          style={{ background: "#F3B95F", margin: "0 auto" }}
          onClick={userInfoHandler}
        >
          Zeige persönliche Daten
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default ShowUserInfo;

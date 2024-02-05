import Dropdown from "react-bootstrap/Dropdown";
import Logout from "./Logout";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import cookie from "js-cookie"; // cookie parser
import "../styles/dropdown.css";
function DropDown() {
  const { user, hasToken, setUserId, setHasToken, setUser, setMsg } =
    useContext(UserContext);

  // const handleIfUserHasToken = () => {
  //   let JWTinfocookie = cookie.get("JWTinfo");

  //   if (!JWTinfocookie) return;

  //   JWTinfocookie = JWTinfocookie.replace("j:", "");
  //   const cookieValueObj = JSON.parse(JWTinfocookie);
  //   setUserId(cookieValueObj.user._id);

  //   const expirationInMs = new Date(cookieValueObj.expires) - new Date();

  //   if (expirationInMs <= 0) return;

  //   setHasToken(true);
  //   setUser(cookieValueObj.user);
  //   setMsg(`Eingeloggter User: ${cookieValueObj.email}.`);
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await handleIfUserHasToken();
  //   };
  //   fetchData();
  // }, [hasToken]); // Include user as a dependency

  const userName = user && user.name ? user.name : "";

  return (
    <Dropdown>
      <Dropdown.Toggle
        className="drop-down"
        variant="success"
        id="dropdown-basic"
      >
        {userName.slice(0, 2).toUpperCase()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Update Password</Dropdown.Item>
        <Logout />
        <Dropdown.Item href="#/action-3">Setting</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;

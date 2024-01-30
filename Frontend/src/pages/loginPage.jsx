import Login from "../components/Login";
import Logout from "../components/Logout";
import Register from "../components/Register";
import UpdatePassword from "../components/UpdatePassword";

function loginPage() {
  return (
    <div className="container">
      <Register />
      <Login />
      <UpdatePassword />
      <Logout />
    </div>
  );
}

export default loginPage;

import Login from "../components/Login";
import Logout from "../components/Logout";
import Signup from "../components/Signup";
// import UpdatePassword from "../components/UpdatePassword";

function loginPage() {
  return (
    <div className="container">
      <Signup />
      <Login />
      {/* <UpdatePassword /> */}
      <Logout />
    </div>
  );
}

export default loginPage;

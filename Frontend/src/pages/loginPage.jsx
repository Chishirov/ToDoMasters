import Login from "../components/Login.jsx";
import Logout from "../components/Logout.jsx";
import Signup from "../components/Signup.jsx";
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

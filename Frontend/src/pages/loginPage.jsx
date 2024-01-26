function loginPage() {
  return (
    <div>
      <h3>Login</h3>
      <form action="">
        <p>Username</p>
        <input type="text" />
        <p>Password</p>
        <input type="text" />
        <button>Login</button>
      </form>
      <h3>Register</h3>
      <form action="">
        <p>Name</p>
        <input type="text" />
        <p>Username</p>
        <input type="text" />
        <p>Password</p>
        <input type="text" />
        <button>Register</button>
      </form>
      <form action="">
        <button>Logout</button>
      </form>
    </div>
  );
}

export default loginPage;

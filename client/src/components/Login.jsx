import React, { useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/login");
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={userData.email}
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={userData.password}
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";

const Register = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerUser = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form
        onSubmit={registerUser}
        className="flex flex-col justify-center items-center gap-10"
      >
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              value={userData.firstname}
              onChange={(e) => {
                setUserData({ ...userData, firstname: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              value={userData.lastname}
              onChange={(e) => {
                setUserData({ ...userData, lastname: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-start gap-2">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full"
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={userData.password}
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={userData.confirmPassword}
              onChange={(e) => {
                setUserData({ ...userData, confirmPassword: e.target.value });
              }}
            />
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;

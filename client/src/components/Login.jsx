import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = userData;
      const login = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(login);
      const data = await login.json();
      console.log(data.error);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Login Successful");
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/dashboard");
          setUserData({
            email: "",
            password: "",
          });
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-fit flex justify-center items-center flex-col">
      <form
        onSubmit={loginUser}
        className="flex flex-col justify-center gap-6 w-[300px] md:w-[500px] items-center border-2 border-gray-500 p-6 rounded-2xl"
      >
        <div className="w-full">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-3 rounded-xl"
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            className="w-full p-3 rounded-xl"
            placeholder="Enter Password"
            value={userData.password}
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

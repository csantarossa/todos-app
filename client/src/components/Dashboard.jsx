import React, { useContext } from "react";
import Modal from "./Modal";
import TodoComponent from "../TodoComponent";
import { UserContext } from "../App";

const Dashboard = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      {!!user && <h1>Welcome back {user.name} 🎉</h1>}
      <Modal />
      <TodoComponent />
    </>
  );
};

export default Dashboard;

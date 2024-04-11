import React, { useContext, useState } from "react";
import { ThemeContext } from "../App";

const Modal = () => {
  const theme = useContext(ThemeContext);
  const [content, setContent] = useState("");

  const createNewTodo = async () => {
    console.log(content);
    try {
      const res = await fetch("http://localhost:8000/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const newTodo = await res.json();
      console.log(newTodo);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        data-theme={theme}
        className={`btn border-none ${
          theme ? "bg-[#1b1b1b] hover:bg-[#161616]" : "hover:bg-[#e8e8e8]"
        }`}
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        New +
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New Task</h3>
          <input
            type="text"
            placeholder="Describe the task..."
            className={`p-3 w-full rounded-lg mt-4 ${
              theme ? "" : "bg-[#efefef]"
            }`}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            required
          />
          <div className="modal-action">
            <form method="dialog" className="flex justify-between w-full">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
              <button
                className="btn bg-[#4eb871] text-white"
                onClick={() => {
                  createNewTodo();
                }}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;

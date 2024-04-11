import { Edit } from "@geist-ui/icons";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../App";

const EditModal = ({ todo }) => {
  const theme = useContext(ThemeContext);
  const dialogId = `edit-modal-${todo._id}`;
  const [editTodo, setEditTodo] = useState(todo.todo);

  const handleEditTodo = async (id) => {
    try {
      console.log(`Testing ${id}`);
      const res = await fetch(`http://localhost:8000/api/todos/update/${id}`, {
        method: "PUT",
        body: JSON.stringify({ updatedTodo: editTodo }),
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(editTodo);
      if (res.ok) {
        const response = await res.json();
        console.log(response);
        // setEditTodo((prevTodo) => {
        //   prevTodo.map((todo) =>
        //     todo._id === id ? { ...prevTodo, todo: editTodo } : todo
        //   );
        // });
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  //

  return (
    <div>
      <button
        className="flex justify-center items-center"
        onClick={() => document.getElementById(`${dialogId}`).showModal()}
      >
        <Edit
          className={`hover:stroke-yellow-500 duration-200 ${
            theme ? "stroke-[#b4b4b4]" : "stroke-black"
          }`}
          size={20}
        />
      </button>
      <dialog id={dialogId} className="modal">
        <div className="modal-box">
          <h3
            className={`font-bold text-lg ${
              theme ? "text-[#8a8a8a]" : "text-[#000]"
            }`}
          >
            Edit Task
          </h3>
          <input
            type="text"
            className={`p-3 w-full ${
              theme ? "bg-[#161616]" : "bg-slate-100"
            } rounded-lg mt-4 ${theme ? "text-[#8a8a8a]" : "text-[#424242]"}`}
            value={editTodo}
            onChange={(e) => {
              setEditTodo(e.target.value);
            }}
          />
          <div className="modal-action">
            <form method="dialog" className="flex justify-between w-full">
              <button className="btn">Close</button>
              <button
                className="btn bg-[#448ceb] text-white"
                onClick={() => {
                  handleEditTodo(todo._id);
                }}
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditModal;

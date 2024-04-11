import React, { useContext } from "react";
import { CheckSquare, Checkbox, Trash, Edit } from "@geist-ui/icons";
import EditModal from "./EditModal";
import { ThemeContext } from "../App";

const Card = ({ todo, setTodos }) => {
  const theme = useContext(ThemeContext);
  const updateTodo = async (todoId, todoStatus) => {
    try {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: "PUT",
        body: JSON.stringify({ status: todoStatus }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        const json = await res.json();
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === todoId ? { ...todo, status: !todo.status } : todo
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (todoId) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.ok) {
      const json = await res.json();
      console.log(json);
      console.log(`Successful Deletion Request: ${todoId}`);
      setTodos((currentTodos) => {
        return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);
      });
    }
  };

  return (
    <div
      data-theme={theme}
      className={`card flex w-full duration-200 ${
        todo.status ? "opacity-50" : ""
      } ${
        theme ? "bg-[#131313] hover:bg-[#161616]" : "hover:bg-[#f6f6f6]"
      } text-primary-content shadow-sm
      `}
    >
      <div className="card-body">
        <p
          className={`text-lg ${theme ? "text-[#b4b4b4]" : "text-black"} ${
            todo.status ? "line-through" : ""
          }`}
        >
          {todo.todo}
        </p>
        <div className="card-actions justify-between pt-4">
          <button
            onClick={() => {
              updateTodo(todo._id, todo.status);
            }}
            className="bg-transparent shadow-none border-none"
          >
            {todo.status ? (
              <CheckSquare
                size={20}
                className={`hover:stroke-blue-600 duration-200 ${
                  theme ? "stroke-[#b4b4b4]" : "stroke-black"
                }`}
              />
            ) : (
              <Checkbox
                size={20}
                className={`hover:stroke-green-600 duration-200 ${
                  theme ? "stroke-[#b4b4b4]" : "stroke-black"
                }`}
              />
            )}
          </button>
          <div className="flex gap-2 items-center justify-center">
            <EditModal color key={todo._id} todo={todo} />

            <button>
              <Trash
                size={20}
                onClick={() => {
                  deleteTodo(todo._id);
                }}
                className={`hover:stroke-red-500 duration-200 ${
                  theme ? "stroke-[#b4b4b4]" : "stroke-black"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

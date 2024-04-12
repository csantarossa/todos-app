import React, { useContext } from "react";
import { ThemeContext, TodosContext } from "./App";
import Card from "./components/Card";

const TodoComponent = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [todos, setTodos] = useContext(TodosContext);
  return (
    <div
      className={`w-[90vw] inline-grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 justify-center items-center shadow-inner ${
        theme ? "bg-[#1b1b1b]" : "bg-[#ececec]"
      } p-6 rounded-3xl`}
    >
      {todos.length > 0 &&
        todos.map((todo) => (
          <Card key={todo._id} todo={todo} setTodos={setTodos} />
        ))}
    </div>
  );
};

export default TodoComponent;

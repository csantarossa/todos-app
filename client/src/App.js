import { createContext, useEffect, useState } from "react";
import Card from "./components/Card";
import { Plus, List } from "@geist-ui/icons";
import Modal from "./components/Modal";
import Footer from "./components/Footer";

export const TodosContext = createContext();
export const ThemeContext = createContext();

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState(() => {
    // Initial theme state is determined by localStorage or defaults to light
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? true : false;
  });

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch("/api/todos");
      const todos = await res.json();
      setTodos(todos);
      console.log(todos);
    };
    getTodos();
  }, []);

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem("theme", theme ? "dark" : "light");
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <TodosContext.Provider value={[todos, setTodos]}>
        <div
          data-theme={`${theme ? "dark" : "light"}`}
          className={`App flex min-h-screen w-full absolute left-[50%] ${
            theme ? "bg-[#131313]" : "bg-white"
          } translate-x-[-50%] justify-start items-center flex-col gap-10 pt-10 overflow-x-hidden`}
        >
          <div className="relative h-auto">
            <h1
              className={`text-6xl font-bold ${
                theme ? "text-[#b4b4b4]" : "text-[#1a1a1a"
              }`}
            >
              todo.
            </h1>
            <p className="text-xs absolute right-0 bottom-[-12px]">
              TASK TRACKING
            </p>
          </div>
          <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller lg:absolute right-20 top-[60px]"
            onClick={() => {
              setTheme(!theme);
            }}
          />

          <Modal />
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
          <Footer />
        </div>
      </TodosContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

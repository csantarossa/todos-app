import { createContext, useEffect, useState } from "react";
import Card from "./components/Card";
import { Plus, List } from "@geist-ui/icons";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TodoComponent from "./TodoComponent";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";

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
    <ThemeContext.Provider value={[theme, setTheme]}>
      <TodosContext.Provider value={[todos, setTodos]}>
        <div
          data-theme={`${theme ? "dark" : "light"}`}
          className={`App flex min-h-screen w-full absolute left-[50%] ${
            theme ? "bg-[#131313]" : "bg-white"
          } translate-x-[-50%] justify-start items-center flex-col gap-10 pt-10 overflow-x-hidden`}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </TodosContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

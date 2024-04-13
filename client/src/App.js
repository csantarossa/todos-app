import { createContext, useEffect, useState } from "react";
import Card from "./components/Card";
import { Plus, List } from "@geist-ui/icons";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import TodoComponent from "./TodoComponent";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

export const TodosContext = createContext();
export const ThemeContext = createContext();
export const UserContext = createContext();

function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/profile");
      const data = await response.json();
      console.log(data);
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const [theme, setTheme] = useState(() => {
    // Initial theme state is determined by localStorage or defaults to light
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? true : false;
  });

  useEffect(() => {
    fetchUser();

    const getTodos = async () => {
      const res = await fetch("/api/todos");
      const todos = await res.json();
      setTodos(todos);
    };
    getTodos();
  }, []);

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem("theme", theme ? "dark" : "light");
  }, [theme]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <ThemeContext.Provider value={[theme, setTheme]}>
        <TodosContext.Provider value={[todos, setTodos]}>
          <div
            data-theme={`${theme ? "dark" : "light"}`}
            className={`App flex min-h-screen w-full absolute left-[50%] ${
              theme ? "bg-[#131313]" : "bg-white"
            } translate-x-[-50%] justify-start items-center flex-col gap-10 pt-10 overflow-x-hidden`}
          >
            <Header />
            <Toaster
              position="bottom-right"
              toastOptions={{ duration: 2000 }}
            />
            <Routes>
              <Route path="/" element={<Navigate replace to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
            <Footer />
          </div>
        </TodosContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

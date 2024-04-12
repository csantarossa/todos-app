import React, { useContext } from "react";
import { ThemeContext } from "../App";

const Header = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="relative h-auto">
        <h1
          className={`text-6xl font-bold ${
            theme ? "text-[#b4b4b4]" : "text-[#1a1a1a"
          }`}
        >
          todo.
        </h1>
        <p className="text-xs absolute right-0 bottom-[-12px]">TASK MANAGER</p>
      </div>
      <input
        type="checkbox"
        value="synthwave"
        className="toggle theme-controller md:absolute right-20 top-[60px]"
        onClick={() => {
          setTheme(!theme);
        }}
      />
    </div>
  );
};

export default Header;

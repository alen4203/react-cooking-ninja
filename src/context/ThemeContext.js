import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = function (state, action) {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export const ThemeProvider = function ({ children }) {
  // custom logic
  const [state, dispatch] = useReducer(themeReducer, {
    mode: "light",
    color: "#58249c",
  });

  const changeColor = function (color) {
    dispatch({ type: "CHANGE_COLOR", payload: color });
  };

  const changeMode = function (mode) {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

import { useContext } from "react";
import { ThemeContext } from "../context/theme-context/ThemeContext";

export const useTheme = () => useContext(ThemeContext);

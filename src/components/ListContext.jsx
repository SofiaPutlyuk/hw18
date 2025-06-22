import { createContext } from "react";
export const ListContext = createContext({
  list: [],
  handleDelete: () => {},
  handleCheckBox: () => {},
});
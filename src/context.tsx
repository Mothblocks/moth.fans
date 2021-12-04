import { createContext } from "react";

export const Context = createContext({
  title: "",

  setTitle: (title: string) => {},
});

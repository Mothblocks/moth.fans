import { useContext, useEffect } from "react";
import { Context } from "./context";

export const useTitle = (title: string) => {
  const context = useContext(Context);

  useEffect(() => {
    context.setTitle(title);

    return () => {
      context.setTitle("");
    };
  }, [title]);
};

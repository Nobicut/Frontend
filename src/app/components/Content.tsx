"use client";
import { useEffect, useMemo, useState } from "react";

export const Content = () => {
  const [auth, setAuth] = useState(true);
  const [state, setState] = useState<"home" | "login" | "splash">("splash");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (auth) {
        setState("home");
      } else {
        setState("login");
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [auth]);

  const indexContent = useMemo(
    () => ({
      login: <div>login</div>,
      home: (
        <div>
          <button onClick={() => setAuth(false)}>click auth to false</button>
        </div>
      ),
      splash: <div>splash</div>,
    }),
    []
  );
  return <div>{indexContent[state]}</div>;
};

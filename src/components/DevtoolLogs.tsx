// components/ErudaInitializer.tsx
"use client";

import { useEffect } from "react";
import eruda from "eruda";

export default function ErudaInitializer() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      eruda.init();
    }
  }, []);

  return null;
}

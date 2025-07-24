"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useIsPWAInstalled(): [
  boolean,
  Dispatch<SetStateAction<boolean>>
] {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const check = () => {
      const standalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const iosStandalone = (window.navigator as any).standalone === true;
      setIsInstalled(standalone || iosStandalone);
    };

    check();

    window.addEventListener("load", check);
    return () => window.removeEventListener("load", check);
  }, []);

  return [isInstalled, setIsInstalled];
}

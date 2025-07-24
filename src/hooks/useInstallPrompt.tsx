"use client";

import { useEffect, useState } from "react";
import { useIsPWAInstalled } from "./useIsInstalled";

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isApple, setIsApple] = useState(false);

  const isInstalledBefore = useIsPWAInstalled();

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();

    const isIOS = /iphone|ipad|ipod|mac/.test(ua);

    setIsApple(isIOS);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsSupported(true);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
    };
  }, []);

  const promptInstall = async () => {
    if (deferredPrompt && "prompt" in deferredPrompt) {
      // @ts-expect-error unknown
      deferredPrompt.prompt();
      // Optionally handle outcome
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { outcome } = await (deferredPrompt as any).userChoice;
      console.log("Install outcome:", outcome);
      setDeferredPrompt(null);
    }
  };

  return {
    isSupported,
    promptInstall,
    isInstalledBefore,
    isApple,
  };
}

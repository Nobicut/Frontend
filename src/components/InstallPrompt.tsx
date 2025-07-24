"use client";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const InstallPrompt = () => {
  const { isSupported, promptInstall, isInstalledBefore, isApple } =
    useInstallPrompt();
  const [open, setOpen] = useState(() => isInstalledBefore);

  useEffect(() => {
    if (isInstalledBefore) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isInstalledBefore]);

  if (isApple && !isSupported) {
    return (
      <Dialog open={open}>
        <DialogContent className="[&>button[data-slot=dialog-close]]:hidden">
          <DialogHeader>
            <DialogTitle className="text-center">اجازه نصب برنامه</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-right">
            <span>
              برای عدم بروز اختلال در عملکرد برنامه، به خصوص ارسال نوتیفیکیشن‌ها
              و استفاده از تمام امکانات برنامه، آن را نصب کنید. برای این‌کار شما
              باید از مرورگر <b>سافاری</b> استفاده، دکمه{" "}
              <b>Add to home screen</b> را انتخاب و آن را به دستگاه خود اضافه
              کنید.
            </span>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  }

  if (!isSupported && !isApple) return null;

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">اجازه نصب برنامه</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-right">
          برای عدم بروز اختلال در عملکرد برنامه، به خصوص ارسال نوتیفیکیشن‌ها و
          استفاده از تمام امکانات برنامه، آن را نصب کنید.
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={async () => await promptInstall()}
            className="bg-green-400 w-full install-tip"
          >
            نصب
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

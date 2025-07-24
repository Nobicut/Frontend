import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import PWAInstallPrompt from "./PWAInstallation";
import { InstallPrompt } from "@/components/InstallPrompt";
import ErudaDevtool from "@/components/DevtoolLogs";
import { getUserInfo } from "@/lib/getUser.server";
import { Suspense } from "react";

const vazir = Vazirmatn({
  variable: "--font-vazir",
  weight: ["400", "500", "700"],
  display: "swap",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Nobicut | رزرو آنلاین نوبت آرایشگاه مردانه",
  description:
    "رزرو سریع و آسان نوبت آرایشگاه مردانه با اپ نوبیکات. بهترین سالن‌ها، بهترین زمان‌ها، بدون معطلی و در کمترین زمان نوبت بگیر و اصلاح خود را تجربه کن.",
  icons: {
    icon: [
      {
        url: "/icons/72.png",
      },
    ],
  },
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = await getUserInfo();

  return (
    <html className="min-h-full" lang="en" dir="rtl">
      <Head>
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/192.png" />
      </Head>

      <body className={`${vazir.className} min-h-full pb-[20px]`}>
        <PWAInstallPrompt />

        {/* <ErudaDevtool /> */}
        <main className="max-w-[460px] flex justify-center mx-auto min-h-full px-[20px]">
          <Suspense>
            <InstallPrompt />
          </Suspense>
          {children}
        </main>
      </body>
    </html>
  );
}

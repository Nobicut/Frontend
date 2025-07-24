import { cookies } from "next/headers";

export const getUserInfo = async () => {
  const token = (await cookies()).get("auth-token")?.value;

  const res = await fetch("https://dummyjson.com/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return null;
  const user = await res.json();
  return user;
};

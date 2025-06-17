"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeaderState } from "./hooks/use-header-state";
import { PersonSVG } from "public/svg/index";

interface AdminActionsProps {
  state: HeaderState;
}

interface User {
  id: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2] ? decodeURIComponent(match[2]) : null;
};

const deleteCookie = (name: string): void => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const parseJwt = (token: string): User | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64Payload = parts[1];
    if (!base64Payload) return null;

    const payload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(payload) as User;
  } catch (error) {
    console.error("JWT 파싱 실패:", error);
    return null;
  }
};

export function AdminActions({ state }: AdminActionsProps) {
  const router = useRouter();
  const { headerVariant } = state;
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = useCallback(() => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    router.push("/admin/login");
  }, [router]);

  useEffect(() => {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      router.push("/admin/login");
      return;
    }

    const parsedUser = parseJwt(accessToken);

    console.log("Parsed User:", parsedUser);

    if (!parsedUser) {
      handleLogout();
      return;
    }

    setUser(parsedUser);
  }, [headerVariant, router, handleLogout]);

  if (headerVariant !== "admin") return null;

  return user ? (
    <div className="ml-auto hidden items-center gap-4 sm:flex lg:mt-4">
      <button
        onClick={handleLogout}
        className="text-gray600 flex items-center gap-1.5 text-base font-normal"
      >
        <PersonSVG />
        <p className="max-w-40 truncate">{user.email}</p>
      </button>
    </div>
  ) : null;
}

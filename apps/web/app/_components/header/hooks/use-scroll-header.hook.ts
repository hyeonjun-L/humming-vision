"use client";

import { useEffect } from "react";

export function useScrollHeader() {
  useEffect(() => {
    const header = document.querySelector(".scroll-header") as HTMLElement;

    if (!header) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isAdminHeader = header.classList.contains("bg-white"); // admin 헤더인지 확인

      if (scrollY > 100) {
        // 스크롤된 상태
        header.setAttribute("data-scrolled", "true");

        if (!isAdminHeader) {
          // home 헤더만 스타일 변경
          header.classList.remove("text-white", "fill-white");
          header.classList.add(
            "!bg-white",
            "!text-black",
            "!fill-black",
            "shadow-sm",
            "backdrop-blur-sm",
          );
        }
      } else {
        // 스크롤 안된 상태
        header.setAttribute("data-scrolled", "false");

        if (!isAdminHeader) {
          // home 헤더 원상복구
          header.classList.remove(
            "!bg-white",
            "!text-black",
            "!fill-black",
            "shadow-sm",
            "backdrop-blur-sm",
          );
          header.classList.add("text-white", "fill-white");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}

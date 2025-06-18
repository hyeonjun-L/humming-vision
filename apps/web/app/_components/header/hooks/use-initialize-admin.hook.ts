"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAdminStore } from "stores/use-admin.store";

export function useInitializeAdmin() {
  const setAdmin = useAdminStore((set) => set.setAdmin);

  const fetchAdmin = async () => {
    try {
      const res = await fetch("/api/admin/info", {
        credentials: "include",
      });

      if (!res.ok) return;

      const admin = await res.json();

      return admin;
    } catch (error) {
      console.error("Admin 정보 로딩 실패:", error);
    }
  };

  const {
    mutate: init,
    isPending,
    error,
  } = useMutation({
    mutationFn: fetchAdmin,
    onSuccess: (admin) => {
      setAdmin(admin);
    },
    onError: (err) => {
      console.error("Admin fetch 실패", err);
    },
  });

  useEffect(() => {
    init();
  }, [init]);

  return { isPending, error };
}

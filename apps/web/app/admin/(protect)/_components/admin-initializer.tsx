"use client";

import { Admin } from "@humming-vision/shared";
import { useQuery } from "@tanstack/react-query";
import { protectApi } from "libs/axios";
import { useEffect } from "react";
import { useAdminStore } from "stores/use-admin.store";

function useAuthVerification() {
  return useQuery<Admin>({
    queryKey: ["admin-auth"],
    queryFn: async () => {
      const response = await protectApi.get<Admin>("/api/admin/info");
      return response.data;
    },
    retry: false,
  });
}

function AdminInitializer() {
  const setAdmin = useAdminStore((state) => state.setAdmin);

  const { data, isError, error } = useAuthVerification();

  useEffect(() => {
    if (data) {
      setAdmin(data);
    }
  }, [data, setAdmin]);

  if (isError) {
    console.error("Authentication failed:", error);
    return null;
  }

  return null;
}

export default AdminInitializer;

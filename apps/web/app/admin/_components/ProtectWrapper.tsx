"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "libs/axios";
import { ADMIN_ROUTE_PATH, AdminRoutePath } from "consts/route.const";
import { useAdminStore } from "stores/use-admin.store";
import { Admin } from "@humming-vision/shared";

interface ProtectWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function useAuthVerification(skip: boolean) {
  return useQuery({
    queryKey: ["admin-auth"],
    queryFn: async () => {
      const response = await api.get<Admin>("/api/admin/info");
      return response.data;
    },
    enabled: !skip,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-y-2 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
        <p className="text-sm text-gray-600">인증 확인 중...</p>
      </div>
    </div>
  );
}

export default function ProtectWrapper({
  children,
  fallback = <LoadingSpinner />,
}: ProtectWrapperProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === `${ADMIN_ROUTE_PATH}${AdminRoutePath.LOGIN}`;
  const setAdmin = useAdminStore((state) => state.setAdmin);

  const { isLoading, isError, error, data } = useAuthVerification(isLoginPage);

  useEffect(() => {
    if (data && !isLoginPage) {
      setAdmin(data);
    }
  }, [data, isLoginPage, setAdmin]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return fallback;
  }

  if (isError) {
    console.log("❌ Authentication failed:", error);
    return null;
  }

  return <>{children}</>;
}

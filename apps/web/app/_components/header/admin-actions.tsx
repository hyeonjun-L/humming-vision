"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { ChevronDown, LogOut, Trash2 } from "lucide-react";
import { HeaderState } from "./hooks/use-header-state.hook";
import { PersonSVG } from "public/svg/index";
import { useAdminStore } from "stores/use-admin.store";
import cn from "libs/cn";
import { protectApi } from "libs/axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "utils/toast-config";
import { DeleteS3Response } from "@humming-vision/shared";
import { toast } from "react-toastify";

interface AdminActionsProps {
  state: HeaderState;
}

function AdminActions({ state }: AdminActionsProps) {
  const router = useRouter();
  const { headerVariant } = state;
  const admin = useAdminStore((state) => state.admin);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await protectApi.delete("/api/admin/logout");
  };

  const logoutMutation = useMutation({
    mutationFn: handleLogout,
    onSuccess: () => {
      toast.dismiss();
      showToast.success("로그아웃 완료", {
        autoClose: 750,
        onClose: () => {
          router.push("/");
        },
      });
    },
    onMutate: () => {
      showToast.info("로그아웃 중...", {
        autoClose: false,
      });
      setIsDropdownOpen(false);
    },
    onError: (error: unknown) => {
      toast.dismiss();
      console.error("Logout error:", error);
      showToast.error("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const cleanupMutation = useMutation({
    mutationFn: async () => {
      const response = await protectApi.delete<DeleteS3Response>(
        "/api/admin/cleanup",
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    },
    onMutate: () => {
      showToast.info("서버 저장공간 정리 중...", {
        autoClose: false,
      });
      setIsDropdownOpen(false);
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast.success(`${data.totalDeleted}개의 서버 저장공간 정리 완료`, {
        autoClose: 750,
      });
    },
    onError: () => {
      toast.dismiss();
      showToast.error(
        "서버 저장공간 정리 중 오류가 발생했습니다. 다시 시도해주세요.",
      );
    },
  });

  const DROP_DOWN_MENU_ITEMS = [
    {
      label: "로그아웃",
      icon: <LogOut className="size-4" />,
      action: () => logoutMutation.mutate(),
    },
    {
      label: "서버 저장공간 정리",
      icon: cleanupMutation.isPending ? (
        <LogOut className="size-4" />
      ) : (
        <Trash2 className="size-4" />
      ),
      action: () => cleanupMutation.mutate(),
    },
  ];

  if (headerVariant !== "admin") return null;

  return admin ? (
    <div className="ml-auto hidden items-center gap-4 sm:flex lg:mt-4">
      <div className="relative" ref={dropdownRef}>
        <button
          className="text-gray600 flex items-center gap-1.5 rounded-lg px-3 py-1 text-base font-normal transition-colors duration-200 hover:bg-gray-50"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <PersonSVG />
          <p className="max-w-40 truncate">{admin.email}</p>
          <ChevronDown
            className={`size-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
            {DROP_DOWN_MENU_ITEMS.map(({ label, icon, action }, index) => (
              <Fragment key={label}>
                <button
                  onClick={action}
                  className={cn(
                    "flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50",
                    { "text-red-600 hover:bg-red-50": label === "로그아웃" },
                  )}
                >
                  {icon}
                  {label}
                </button>

                {DROP_DOWN_MENU_ITEMS.length - 1 !== index && (
                  <hr className="my-1 border-gray-100" />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="ml-auto hidden animate-pulse items-center gap-4 sm:flex lg:mt-4">
      <div className="flex items-center gap-1.5">
        <div className="h-5 w-5 rounded-full bg-gray-200"></div>
        <div className="space-y-1">
          <div className="h-4 w-32 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

export default AdminActions;

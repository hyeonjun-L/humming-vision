"use client";

import { HeaderState } from "./hooks/use-header-state.hook";
import { PersonSVG } from "public/svg/index";
import { useAdminStore } from "stores/use-admin.store";

interface AdminActionsProps {
  state: HeaderState;
}

function AdminActions({ state }: AdminActionsProps) {
  const { headerVariant } = state;
  const admin = useAdminStore((state) => state.admin);

  if (headerVariant !== "admin") return null;

  return admin ? (
    <div className="ml-auto hidden items-center gap-4 sm:flex lg:mt-4">
      <button className="text-gray600 flex items-center gap-1.5 text-base font-normal">
        <PersonSVG />
        <p className="max-w-40 truncate">{admin.email}</p>
      </button>
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

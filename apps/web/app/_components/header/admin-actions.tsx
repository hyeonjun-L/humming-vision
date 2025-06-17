import { HeaderState } from "./hooks/use-header-state";

interface AdminActionsProps {
  state: HeaderState;
}

export function AdminActions({ state }: AdminActionsProps) {
  const { headerVariant } = state;

  console.log(headerVariant);

  if (headerVariant !== "admin") return null;

  return (
    <div className="ml-auto">
      <button className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600">
        로그아웃
      </button>
    </div>
  );
}

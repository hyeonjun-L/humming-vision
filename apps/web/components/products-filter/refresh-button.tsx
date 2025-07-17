"use client";

import { usePathname, useRouter } from "next/navigation";
import { ResetSVG } from "public/svg";

function RefreshButton() {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    router.replace(pathname);
  };

  return (
    <button
      onClick={handleClick}
      className="border-gray200 mt-5 flex h-11 w-full items-center justify-center gap-1.5 border"
    >
      초기화
      <ResetSVG className="size-5" />
    </button>
  );
}

export default RefreshButton;

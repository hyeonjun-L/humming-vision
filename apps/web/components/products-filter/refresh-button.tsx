"use client";

import { RoutePath } from "consts/route.const";
import { usePathname, useRouter } from "next/navigation";
import { ResetSVG } from "public/svg";

function RefreshButton() {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    router.replace(pathname);
  };

  if (
    pathname.startsWith(RoutePath.ETC) ||
    pathname.startsWith(RoutePath.LIGHT)
  ) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="border-gray200 my-5 flex h-11 w-full items-center justify-center gap-1.5 border"
    >
      초기화
      <ResetSVG className="size-5" />
    </button>
  );
}

export default RefreshButton;

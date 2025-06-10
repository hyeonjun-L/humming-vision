import { RoutePath } from "consts/route.const";
import Link from "next/link";
import { LogoSVG } from "public/svg";

function Logo() {
  return (
    <Link href={RoutePath.HOME} className="flex items-center gap-2.5">
      <LogoSVG className="h-16" />
      <h1 className="font-gotham text-xl tracking-[0.8rem]">HUMMING VISION</h1>
    </Link>
  );
}

export default Logo;

import { RoutePath } from "consts/route.const";
import Link from "next/link";
import { LogoSVG } from "public/svg/index";

function Logo() {
  return (
    <Link href={RoutePath.HOME} className="flex items-center gap-2.5">
      <LogoSVG className="h-9 lg:h-16" />
      <h1 className="font-gotham text-sm tracking-[0.4rem] whitespace-normal sm:text-base sm:tracking-[0.8rem] lg:text-xl">
        HUMMING VISION
      </h1>
    </Link>
  );
}

export default Logo;

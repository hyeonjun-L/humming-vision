import { LogoSVG } from "public/svg";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <LogoSVG className="h-16" />
      <h1 className="font-gotham text-xl tracking-[1rem] text-white">
        HUMMING VISION
      </h1>
    </div>
  );
}

export default Logo;

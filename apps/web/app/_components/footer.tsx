import Logo from "components/logo";

function Footer() {
  return (
    <footer className="boreder-gray200 item flex h-64 w-full flex-col justify-center gap-10 border-t px-10 md:h-[300px] xl:flex-row xl:justify-evenly xl:gap-0">
      <Logo />
      <div className="text-gray600 flex flex-col justify-center text-sm xl:items-end">
        <p>경기도 안양시 흥안대로 427번길 47 인덕원 LDC비즈타워 713호</p>
        <p>(TEL : 031-360-2977 FAX : 031-360-2978)</p>
        <p>주식회사 허밍비젼</p>
      </div>
    </footer>
  );
}

export default Footer;

import Logo from "components/logo";
import { COMPANY } from "consts/metadata.const";

function Footer() {
  return (
    <footer className="boreder-gray200 item flex h-64 w-full flex-col justify-center gap-10 border-t px-10 md:h-[300px] xl:flex-row xl:justify-evenly xl:gap-0">
      <Logo />
      <div className="text-gray600 flex flex-col justify-center text-sm xl:items-end">
        <p>{COMPANY.address}</p>
        <p>
          (TEL : {COMPANY.tel} FAX : {COMPANY.fax})
        </p>
        <p>{COMPANY.name}</p>
      </div>
    </footer>
  );
}

export default Footer;

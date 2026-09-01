import Logo from "components/logo";
import { COMPANY, PRIVACY_POLICY_URL } from "consts/metadata.const";

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
        {/* 개인정보처리방침은 홈페이지에 상시 공개해야 한다 (개인정보 보호법 제30조) */}
        <a
          href={PRIVACY_POLICY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-main mt-2 font-semibold underline underline-offset-2"
        >
          개인정보처리방침
        </a>
      </div>
    </footer>
  );
}

export default Footer;

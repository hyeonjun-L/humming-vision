import { COMPANY } from "consts/metadata.const";
import Map from "../map";
import ContactForm from "./contact-form";

function Contact() {
  return (
    <section className="bg-gray100 flex w-full flex-col items-center justify-center pt-10 md:pt-20 xl:pt-32">
      <p className="text-gray400 text-xl font-normal">제품문의</p>
      <h2 className="text-gray600 font-gotham-bold mb-10 text-[30px] font-bold md:mb-14 md:text-[40px] lg:text-[50px] xl:mb-24">
        Contact
      </h2>
      <div className="grid w-[80%] xl:grid-cols-[auto_1fr]">
        <div className="text-main top-48 z-10 order-1 mt-[106px] flex flex-col self-start xl:sticky xl:order-0 xl:mt-0">
          <p className="font-gotham-bold mb-10 text-2xl">Info</p>
          <h3 className="mb-10 text-xl font-normal">{COMPANY.name}</h3>
          <dl className="grid grid-cols-[auto_1fr] gap-4">
            <dt className="text-gray300 text-base font-normal">TEL.</dt>
            <dd className="">{COMPANY.tel}</dd>
            <dt className="text-gray300 text-base font-normal">FAX.</dt>
            <dd className="">{COMPANY.fax}</dd>
            <dt className="text-gray300 text-base font-normal">Email.</dt>
            <dd className="">{COMPANY.email}</dd>
          </dl>
        </div>
        <ContactForm />
        <div className="order-4 mt-28 mb-24 w-full md:mt-20 xl:col-start-2 xl:mt-20">
          <Map />
        </div>
      </div>
    </section>
  );
}

export default Contact;

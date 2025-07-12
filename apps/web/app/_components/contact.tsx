import { Input } from "components/input";
import SubmitButton from "components/submit-button";
import cn from "libs/cn";
import { Fragment } from "react";

const CONTACT_FIELDS = [
  {
    id: "name",
    label: "이름",
    placeholder: "이름",
    required: true,
    type: "input" as const,
  },
  {
    id: "company",
    label: "회사명",
    placeholder: "기업/ 단체명",
    required: false,
    type: "input" as const,
  },
  {
    id: "email",
    label: "이메일",
    placeholder: "이메일",
    required: true,
    type: "input" as const,
  },
  {
    id: "subject",
    label: "제목",
    placeholder: "문의제목",
    required: false,
    type: "input" as const,
  },
  {
    id: "content",
    label: "내용",
    placeholder: "내용을 입력해주세요.",
    required: true,
    type: "textarea" as const,
  },
] as const;

function Contact() {
  return (
    <section className="bg-gray100 flex w-full flex-col items-center justify-center pt-10 pb-28 md:py-20 xl:py-32">
      <p className="text-gray400 text-xl font-normal">제품문의</p>
      <h2 className="text-gray600 font-gotham-bold mb-10 text-[30px] font-bold md:mb-14 md:text-[40px] lg:text-[50px] xl:mb-24">
        Contact
      </h2>
      <form className="grid w-full px-5 sm:w-auto xl:grid-cols-[1fr_auto_auto]">
        <div className="text-main order-3 mt-[106px] flex flex-col xl:order-1 xl:mt-0">
          <p className="font-gotham-bold mb-10 text-2xl">Info</p>
          <h3 className="mb-10 text-xl font-normal">주식회사 허밍비젼</h3>
          <dl className="grid grid-cols-[auto_1fr] gap-4">
            <dt className="text-gray300 text-base font-normal">TEL.</dt>
            <dd className="">031-360-2977</dd>
            <dt className="text-gray300 text-base font-normal">FAX.</dt>
            <dd className="">031-360-2978</dd>
            <dt className="text-gray300 text-base font-normal">Email.</dt>
            <dd className="">hmv_info@naver.com</dd>
          </dl>
        </div>
        <div className="mb-5 grid w-full grid-cols-[auto_1fr] items-center gap-y-5 sm:w-xl xl:order-2 xl:mr-5 xl:mb-0 xl:ml-16">
          {CONTACT_FIELDS.map(({ id, label, placeholder, required, type }) => (
            <Fragment key={id}>
              <p
                key={`label-${id}`}
                className={cn(
                  "text-gray600 border-gray300 flex h-full w-24 items-center border-b text-base font-normal",
                  {
                    "items-start pt-2.5": label === "내용",
                  },
                )}
              >
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
              </p>
              {type === "input" ? (
                <Input
                  key={`input-${id}`}
                  variant="underline"
                  className="!border-b-gray300"
                  placeholder={placeholder}
                />
              ) : (
                <textarea
                  key={`textarea-${id}`}
                  className="border-b-gray300 h-60 w-full resize-none border-0 border-b bg-transparent px-3 pt-2.5 text-base font-normal focus:outline-none"
                  placeholder={placeholder}
                />
              )}
            </Fragment>
          ))}
        </div>
        <div className="flex items-end xl:order-3">
          <SubmitButton
            isSubmitting={false}
            text="문의하기"
            loadingText="문의등록 중..."
          />
        </div>
        {/* <p className="order-2">1</p>
        <p className="order-3">2</p>
        <p className="order-1">3</p> */}
      </form>
    </section>
  );
}

export default Contact;

import ContactForm from "@/_components/contact/contact-form";

function page() {
  return (
    <main className="mt-44.5 w-full">
      <section className="bg-gray100 relative w-full py-16 sm:py-20">
        <h2 className="bg-main absolute -top-9 left-0 w-3/5 py-2.5 pr-10 text-right text-xl font-bold text-white sm:py-5 sm:pr-20 sm:text-2xl md:pr-40">
          제품문의
        </h2>
        <div className="mx-2.5 flex max-w-6xl flex-col gap-10 bg-white p-10 md:mx-10 lg:mx-20 xl:mx-auto">
          <ContactForm isContactPage />
        </div>
      </section>
    </main>
  );
}

export default page;

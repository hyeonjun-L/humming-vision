import requireAdminUser from "utils/require-admin-user";
import ContactPage from "./_components/contact-page";

async function page() {
  await requireAdminUser();

  return <ContactPage />;
}

export default page;

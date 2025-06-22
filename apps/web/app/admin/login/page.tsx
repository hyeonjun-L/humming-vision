import { redirect } from "next/navigation";
import AdminLoginPage from "./_components/login-page";
import { cookies } from "next/headers";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ADMIN_ROUTE_PATH, AdminRoutePath } from "consts/route.const";
import verifyAccessToken from "utils/verify-access-token";

async function page() {
  const cookieStore = cookies();

  const accessToken = (await cookieStore).get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  if (accessToken) {
    try {
      await verifyAccessToken(accessToken);
    } catch {
      (await cookieStore).delete(COOKIE_NAMES.ACCESS_TOKEN);
    }
    redirect(`${ADMIN_ROUTE_PATH}${AdminRoutePath.CONTACT}`);
  }

  return <AdminLoginPage />;
}

export default page;

import { ADMIN_ROUTE_PATH, AdminRoutePath } from "consts/route.const";
import { redirect } from "next/navigation";

function Admin() {
  // 추후 admin main 페이지가 필요할 경우를 대비 ex) 대시보드

  redirect(`${ADMIN_ROUTE_PATH}${AdminRoutePath.CONTACT}`);
}

export default Admin;

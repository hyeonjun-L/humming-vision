import {
  RoutePath,
  RoutePathETC,
  RoutePathWithCategory,
} from "consts/route.const";
import { redirect } from "next/navigation";

function page() {
  return redirect(
    `${RoutePath.ETC}${RoutePathWithCategory.SOFTWARE}${RoutePathETC.MATROX}`,
  );
}

export default page;

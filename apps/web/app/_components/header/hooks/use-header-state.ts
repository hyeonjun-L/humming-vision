import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ADMIN_ROUTE_PATH,
  AdminRoutePath,
  ADMIN_NAV_ITEMS,
  NAV_ITEMS,
} from "consts/route.const";

export interface HeaderState {
  isClient: boolean;
  isAdminPage: boolean;
  isAdminLoginPage: boolean;
  isHomePage: boolean;
  navItems: typeof NAV_ITEMS | typeof ADMIN_NAV_ITEMS;
  headerVariant: "home" | "admin" | "default";
}

export function useHeaderState(): HeaderState {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const isAdminPage = pathname.startsWith(ADMIN_ROUTE_PATH);
  const isAdminLoginPage =
    pathname === `${ADMIN_ROUTE_PATH}${AdminRoutePath.LOGIN}`;
  const isHomePage = pathname === "/";

  const navItems = isAdminPage ? ADMIN_NAV_ITEMS : NAV_ITEMS;

  const getHeaderVariant = (): "home" | "admin" | "default" => {
    if (isHomePage) return "home";
    if (isAdminPage) return "admin";
    return "default";
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return {
    isClient,
    isAdminPage,
    isAdminLoginPage,
    isHomePage,
    navItems,
    headerVariant: getHeaderVariant(),
  };
}

"use client";
import Logo from "components/logo";
import HeaderNavModalViewButton from "./header-nav-modal-view-button";
import { useHeaderState } from "./hooks/use-header-state.hook";
import { getHeaderClassName, getNavClassName } from "./utils/header-styles";
import { Navigation } from "./navigation";
import { ADMIN_ROUTE_PATH } from "consts/route.const";
import AdminActions from "./admin-actions";
import { useScrollHeader } from "./hooks/use-scroll-header.hook";

function Header() {
  const state = useHeaderState();
  useScrollHeader();

  return (
    <header className={getHeaderClassName(state)}>
      <nav className={getNavClassName(state)}>
        <Logo />
        <Navigation navItems={state.navItems} state={state} />
        {state.pathname.startsWith(ADMIN_ROUTE_PATH) && (
          <AdminActions state={state} />
        )}
        <HeaderNavModalViewButton />
      </nav>
    </header>
  );
}

export default Header;

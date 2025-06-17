"use client";
import Logo from "components/logo";
import HeaderNavModalViewButton from "./header-nav-modal-view-button";
import { useHeaderState } from "./hooks/use-header-state";
import { getHeaderClassName, getNavClassName } from "./utils/header-styles";
import { Navigation } from "./navigation";
import { AdminActions } from "./admin-actions";

function Header() {
  const state = useHeaderState();

  return (
    <header className={getHeaderClassName(state)}>
      <nav className={getNavClassName(state)}>
        <Logo />
        <Navigation navItems={state.navItems} state={state} />
        <AdminActions state={state} />
        <HeaderNavModalViewButton />
      </nav>
    </header>
  );
}

export default Header;

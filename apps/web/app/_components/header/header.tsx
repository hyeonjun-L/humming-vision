import Logo from "components/logo";
import { ProductEntity, RoutePath } from "consts/route.const";

function Header() {
  // const NAV_ITEMS = [
  //   { name: "Camera", href: RoutePath.PRODUCTS },
  //   { name: "Lens", href: RoutePath.SOLUTIONS },
  //   { name: "Frame Grabber", href: RoutePath.SUPPORT },
  //   { name: "Light", href: RoutePath.ABOUT },
  //   { name: "ETC", href: RoutePath.HOME },
  //   { name: "제품문의", href: RoutePath.HOME },
  // ];
  const test: ProductEntity["categories"] = "SOFTWARE";

  return (
    <header className="fixed top-0 z-(--z-header) w-full py-10.5">
      <nav className="mx-auto flex justify-evenly">
        <Logo />
        dsadasdsa
      </nav>
    </header>
  );
}

export default Header;

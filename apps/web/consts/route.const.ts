export enum RoutePath {
  HOME = "/",
  CAMERA = "/camera",
  LENS = "/lens",
  FRAMEGRABBER = "/frame-grabber",
  LIGHT = "/light",
  ETC = "/etc",
  CONTACT = "/contact",
}

export enum RoutePathWithCategory {
  AREA = "/area",
  LINE = "/line",
  CCTV = "/cctv",
  TCL = "/tcl",
  COAXPRESS = "/coaxpress",
  LINK = "/link",
  GIGE = "/gige",
  USB = "/usb",
  DOWNLOAD = "/download",
  SOFTWARE = "/software",
  ACCESSORY = "/accessory",
}

export const ADMIN_ROUTE_PATH = "/admin";

export enum AdminRoutePath {
  LOGIN = "/login",
  CONTACT = "/contact",
  PRODUCTS = "/products",
  PRODUCT_CREATE = "/product/create",
  PRODUCT_UPDATE = "/product/update",
}
export interface NavItemWithSubmenu {
  name: string;
  hrefs: { name: string; href: string }[];
}

export interface NavItemWithLink {
  name: string;
  href: string;
}

export type NavItem = NavItemWithSubmenu | NavItemWithLink;

export const NAV_ITEMS: NavItem[] = [
  {
    name: "Camera",
    hrefs: [
      {
        name: "Area Camera",
        href: `${RoutePath.CAMERA}${RoutePathWithCategory.AREA}`,
      },
      {
        name: "Line Scan Camera",
        href: `${RoutePath.CAMERA}${RoutePathWithCategory.LINE}`,
      },
    ],
  },
  {
    name: "Lens",
    hrefs: [
      {
        name: "CCTV Lens",
        href: `${RoutePath.LENS}${RoutePathWithCategory.CCTV}`,
      },
      {
        name: "TCL Lens",
        href: `${RoutePath.LENS}${RoutePathWithCategory.TCL}`,
      },
    ],
  },
  {
    name: "Frame Grabber",
    hrefs: [
      {
        name: "CoaXPress",
        href: `${RoutePath.FRAMEGRABBER}${RoutePathWithCategory.COAXPRESS}`,
      },
      {
        name: "Cammera Link",
        href: `${RoutePath.FRAMEGRABBER}${RoutePathWithCategory.LINK}`,
      },
      {
        name: "GigE",
        href: `${RoutePath.FRAMEGRABBER}${RoutePathWithCategory.GIGE}`,
      },
      {
        name: "USB",
        href: `${RoutePath.FRAMEGRABBER}${RoutePathWithCategory.USB}`,
      },
    ],
  },
  {
    name: "Light",
    hrefs: [
      {
        name: "Light",
        href: RoutePath.LIGHT,
      },
      {
        name: "Download",
        href: `${RoutePath.LIGHT}${RoutePathWithCategory.DOWNLOAD}`,
      },
    ],
  },
  {
    name: "ETC",
    hrefs: [
      {
        name: "Software",
        href: `${RoutePath.ETC}${RoutePathWithCategory.SOFTWARE}`,
      },
      {
        name: "Accessory",
        href: `${RoutePath.ETC}${RoutePathWithCategory.ACCESSORY}`,
      },
    ],
  },
  { name: "Contact", href: RoutePath.CONTACT },
];

export const ADMIN_NAV_ITEMS: NavItemWithLink[] = [
  {
    name: "제품문의",
    href: `${ADMIN_ROUTE_PATH}${AdminRoutePath.CONTACT}`,
  },
  {
    name: "제품관리",
    href: `${ADMIN_ROUTE_PATH}${AdminRoutePath.PRODUCTS}`,
  },
  {
    name: "제품등록",
    href: `${ADMIN_ROUTE_PATH}${AdminRoutePath.PRODUCT_CREATE}`,
  },
];

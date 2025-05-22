import useClickOutside from "@/hooks/use-click-outside";
import useScrollObserver from "@/hooks/use-scroll-observer";
import { Link } from "@/i18n/link";
import { ChevronDown, ChevronRight, Menu, MoveLeft, X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface MenuItemLink {
  name: string;
  url: string;
}

interface MenuItem {
  id: string;
  title: string;
  image: string;
  imageLink: string;
  links: MenuItemLink[];
}

// Menu Data (Sizin sağladığınız veri ile aynı)
const menuItems: MenuItem[] = [
  {
    id: "about",
    title: "About",
    image: "https://assets.hoi.com.tr/dummy_header_image.jpg",
    imageLink: "#",
    links: [
      { name: "Who Are We?", url: "/" },
      { name: "History", url: "/" },
      { name: "Board of Directors", url: "/" },
      { name: "Organization Chart", url: "/" },
      { name: "Code of Ethics and Compliance Policies", url: "/" },
    ],
  },
  {
    id: "activity-fields",
    title: "Activity Fields",
    image: "https://assets.hoi.com.tr/dummy_header_image.jpg",
    imageLink: "#",
    links: [
      { name: "Who Are We?", url: "/" },
      { name: "History", url: "/" },
      { name: "Board of Directors", url: "/" },
      { name: "Organization Chart", url: "/" },
      { name: "Code of Ethics and Compliance Policies", url: "/" },
    ],
  },
  {
    id: "investor-relations",
    title: "Investor Relations",
    image: "https://assets.hoi.com.tr/dummy_header_image.jpg",
    imageLink: "#",
    links: [
      { name: "Investor Relations Main Page", url: "/" },
      { name: "Why Koç Holding?", url: "/" },
      { name: "About Koç Holding", url: "/" },
      { name: "Stock Information & Investor Tools", url: "/" },
      { name: "Presentations and Bulletins", url: "/" },
      { name: "Financial Information", url: "/" },
      { name: "Announcements and Publications", url: "/" },
      { name: "Reports", url: "/" },
      { name: "Investor Kit", url: "/" },
      { name: "Corporate Governance", url: "/" },
      { name: "Calendar", url: "/" },
      { name: "Contact", url: "/" },
    ],
  },
  {
    id: "life-in-koc",
    title: "Life In Koç",
    image: "https://assets.hoi.com.tr/dummy_header_image.jpg",
    imageLink: "#",
    links: [
      { name: "Koç Culture And Our Priorities", url: "/" },
      { name: "Being A Part of Koç", url: "/" },
      { name: "Industrial Relations", url: "/" },
    ],
  },
  {
    id: "sustainability",
    title: "Sustainability",
    image: "https://assets.hoi.com.tr/dummy_header_image.jpg",
    imageLink: "#",
    links: [
      { name: "Lead. Together", url: "/" },
      { name: "Grow the business. Together", url: "/" },
      { name: "Empower people. Together", url: "/" },
      { name: "Act for the planet. Together", url: "/" },
      { name: "Strengthen communities. Together", url: "/" },
      { name: "Reports and Policies", url: "/" },
      { name: "Vehbi Koç Foundation", url: "/" },
      { name: "Rahmi M. Koç Museum", url: "/" },
      { name: "Sponsorships", url: "/" },
    ],
  },
  {
    id: "media-center",
    title: "Media Center",
    image: "https://assets.hoi.com.tr/dummy_header_image.jpg",
    imageLink: "#",
    links: [
      { name: "News", url: "/" },
      { name: "Press Releases", url: "/" },
    ],
  },
];

export const RootHeader: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const scrollState = useScrollObserver({ offset: 120 });

  const ref = useClickOutside<HTMLDivElement>(() => {
    closeAllMenus();
    activeMenu === null;
  });

  const handleMenuToggle = (menuId: string) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  const handleMobileMenuOpen = () => {
    setIsMobileMenuOpen(true);
    setActiveMenu(null);
  };

  const closeAllMenus = () => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const closeSubMenuAndShowMobileNav = () => {
    setActiveMenu(null);
    setIsMobileMenuOpen(true);
  };

  useEffect(() => {
    const LG_BREAKPOINT_PX = 1024;
    const mediaQuery = window.matchMedia(`(min-width: ${LG_BREAKPOINT_PX}px)`);

    const handleMediaQueryChange = (
      event: MediaQueryListEvent | MediaQueryList,
    ) => {
      if (event.matches) {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false); // Mobil menü açıksa kapat
        }
      }
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [isMobileMenuOpen, activeMenu]);

  return (
    <header
      data-active={activeMenu || isMobileMenuOpen ? "open" : "close"}
      data-scroll-passed={scrollState.passed ? "yes" : "no"}
      data-scroll={scrollState.position}
      className="scroll-observer header group/header fixed z-50 w-full text-gray-50 transition-all duration-300 data-[active=open]:text-gray-950 data-[scroll-passed=yes]:bg-white data-[scroll-passed=yes]:text-gray-950"
      id="header"
    >
      <div ref={ref}>
        <nav
          style={{
            transitionProperty: "padding, color, opacity",
            transitionDuration: "500ms, 100ms, 100ms",
            transitionDelay: "0ms, 0ms",
          }}
          className="flex w-full items-center justify-between border-b border-transparent px-4 pt-8 pb-4 group-data-[active=open]/header:pt-6 group-data-[scroll-passed=yes]/header:border-gray-200 group-data-[scroll-passed=yes]/header:pt-6 xl:px-8"
        >
          {/* Logo Bölümü */}
          <div className="relative z-60 flex items-center lg:z-100">
            <Link to="/" className={`relative mr-8 h-10 w-32`}>
              <img
                src="/images/brand/white.svg"
                alt="Holding Logo"
                className="absolute inset-0 top-0 opacity-0 transition-opacity group-data-[active=close]/header:opacity-100 group-data-[scroll-passed=no]/header:opacity-100"
              />
              <img
                src="/images/brand/dark.svg"
                alt="Holding Logo"
                className="absolute inset-0 opacity-0 transition-opacity group-data-[active=open]/header:opacity-100 group-data-[scroll-passed=yes]/header:opacity-100"
              />
            </Link>
          </div>

          {/* Ana Menü - Masaüstü */}
          <div className="relative z-60 hidden items-center group-data-[active=open]/header:!text-gray-950 lg:z-100 lg:flex">
            <ul className="flex gap-x-6 text-sm xl:gap-x-12 xl:text-base">
              {menuItems.map((menu, index) => (
                <li>
                  <button
                    data-targets={`header,side-menu-${index + 1}`}
                    data-active={activeMenu === menu.id ? "open" : "close"}
                    className="dialog group relative"
                    onClick={() => handleMenuToggle(menu.id)}
                  >
                    <div className="flex cursor-pointer items-center">
                      <span className="tracking-wide">{menu.title}</span>
                      <ChevronDown className="text-primary-700 ml-1 size-4 transition-all duration-300 group-data-[active=open]:rotate-180" />
                    </div>
                    <div className="bg-primary-700 absolute -bottom-1 -left-0.5 h-px w-full origin-left scale-x-0 transition-all duration-300 group-data-[active=open]:scale-x-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Container */}
          <div
            id="mobile-menu"
            data-active={
              isMobileMenuOpen && activeMenu === null ? "open" : "close"
            }
            className="group/mobile pointer-events-none fixed inset-0 z-60 flex data-[active=open]:pointer-events-auto lg:z-100 lg:hidden"
          >
            {/* Backdrop Blur + Overlay */}
            <div
              className="absolute inset-0 bg-gray-50/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-data-[active=open]/mobile:opacity-100"
              onClick={closeAllMenus}
            />

            {/* Ana Mobil Menü İçeriği */}
            <div className="sidebar relative z-[61] h-svh w-full max-w-[512px] -translate-x-full overflow-hidden overflow-y-auto bg-white pb-6 shadow-lg transition-all duration-300 group-data-[active=open]/mobile:translate-x-0">
              <div className="flex justify-between border-b border-gray-200 p-4">
                <div className="relative z-[60] flex h-10 w-32 items-center">
                  <img
                    src="/images/brand/dark.svg"
                    alt="Holding Logo"
                    className="absolute inset-0"
                  />
                </div>
                <div className="flex items-center justify-end gap-4 text-gray-800">
                  <Link to="/tr" className="hover:text-gray-500">
                    TR
                  </Link>
                  <div className="h-full border-r border-gray-200" />
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={closeAllMenus}
                  >
                    <X className="size-8 text-gray-950 hover:text-gray-500" />
                  </button>
                </div>
              </div>
              <ul className="group/alt flex w-full flex-col items-start justify-start gap-y-2 px-4 pt-2 pb-4">
                {menuItems.map((menuItem) => (
                  <li className="relative h-fit w-full">
                    <button
                      className="dialog group/el flex w-full items-center justify-between py-4 transition-all duration-300 ease-in-out hover:text-red-600 hover:!opacity-100 group-hover/alt:[&:not(:hover)]:opacity-60"
                      onClick={() => {
                        handleMenuToggle(menuItem.id);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="flex w-full items-center justify-between">
                        <h3 className="text-gray-950 lg:line-clamp-1">
                          {menuItem.title}
                        </h3>
                        <ChevronRight className="text-primary-700 size-5" />
                      </div>
                      <div className="group-hover/el:bg-primary-700 absolute bottom-0 left-0 h-px w-full bg-gray-200 transition-all duration-300 group-hover/el:h-[1.5px]" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sağ Bölüm (Dil Seçimi ve Mobil Menü Butonu) */}
          <div className="relative z-60 flex items-center gap-x-3 lg:z-100">
            <div className="hidden items-center gap-x-3 lg:flex">
              <Link to="/en" className="text-sm">
                EN
              </Link>
              <div className="h-8 w-px bg-gray-200" />
            </div>
            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle"
              data-active={isMobileMenuOpen ? "open" : "close"}
              className={`dialog group/mbtn bg-primary-700 relative z-60 flex size-12 items-center justify-center rounded-sm group-data-[active=open]/header:bg-transparent group-data-[scroll-passed=yes]/header:bg-transparent lg:hidden ${
                activeMenu ? "!hidden" : "" // Eğer bir alt menü açıksa mobil toggle'ı gizle
              } data-[active=open]:!hidden`} // Eğer mobil ana menü açıksa da gizle
              onClick={handleMobileMenuOpen}
            >
              <Menu className="size-6 text-gray-50 group-data-[active=open]/header:text-gray-950 group-data-[scroll-passed=yes]/header:!text-gray-950" />
            </button>
          </div>
        </nav>

        {/* Sub Menus */}
        {menuItems.map((menu, index) => (
          <SubMenuPanel
            key={menu.id}
            menuItem={menu}
            isActive={activeMenu === menu.id}
            index={index}
            onCloseAll={closeAllMenus}
            onCloseSubMenu={closeSubMenuAndShowMobileNav}
          />
        ))}
      </div>
    </header>
  );
};

interface SubMenuPanelProps {
  menuItem: MenuItem;
  isActive: boolean;
  index: number;
  onCloseAll: () => void;
  onCloseSubMenu: () => void;
}

const SubMenuPanel: React.FC<SubMenuPanelProps> = ({
  menuItem,
  isActive,
  index,
  onCloseAll,
  onCloseSubMenu,
}) => (
  <div
    id={`side-menu-${index + 1}`}
    data-active={isActive ? "open" : "close"}
    className="group pointer-events-none fixed top-0 left-0 z-[101] w-full max-w-[512px] data-[active=open]:pointer-events-auto lg:z-99 lg:max-w-full"
  >
    <div className="relative grid h-svh w-full translate-x-[-100%] grid-rows-[1fr] overflow-hidden bg-white opacity-0 transition-all duration-300 group-data-[active=open]:translate-x-[0%] group-data-[active=open]:grid-rows-[1fr] group-data-[active=open]:opacity-100 lg:h-auto lg:translate-x-[0%] lg:grid-rows-[0fr] lg:pt-28">
      <div className="sidebar overflow-y-auto pb-8">
        <div className="flex w-full flex-col lg:flex-row">
          {/* Mobile Header & Controls */}
          <div className="lg:hidden">
            <div className="flex justify-between border-b border-gray-200 p-4">
              <div className="relative z-[60] flex h-10 w-32 items-center">
                <img
                  src="/images/brand/dark.svg"
                  alt="Holding Logo"
                  className="absolute inset-0"
                />
              </div>
              <div className="flex items-center justify-end gap-4 text-gray-800">
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={onCloseAll}
                >
                  <X className="size-6 -translate-x-[37.5%] text-gray-950" />
                </button>
              </div>
            </div>
            <div className="flex justify-between border-t border-gray-200 px-4 py-4">
              <button
                className="dialog text-gray-500 hover:text-gray-800"
                onClick={onCloseSubMenu}
              >
                <MoveLeft className="size-5 text-gray-950" />
              </button>
            </div>
          </div>

          {/* Sol taraf - Görsel ve Başlık */}
          <div className="w-full flex-shrink-0 lg:h-[310px] lg:w-[600px] lg:pr-2">
            <Link
              to={menuItem.imageLink}
              className="group/left relative mb-6 block w-full overflow-hidden opacity-0 group-data-[active=open]:opacity-100"
              aria-label={`Learn more about ${menuItem.title}`}
              title={menuItem.title}
              style={{
                transitionProperty: "opacity",
                transitionDuration: "600ms",
                transitionDelay: "200ms",
              }}
            >
              <img
                src={menuItem.image}
                alt={`${menuItem.title} visual representation`}
                className="h-full max-h-[240px] w-full bg-white object-cover transition-all duration-300 group-hover/left:scale-105 lg:h-[310px] lg:max-h-full"
                width="600"
                height="310"
                loading="lazy"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent px-4 pb-8 lg:px-8"
                aria-hidden="false"
              >
                <h2
                  className="mb-4 text-3xl font-semibold tracking-wider text-white lg:text-4xl"
                  id={`${menuItem.id}-heading`}
                >
                  {menuItem.title}
                </h2>
                <span
                  className="border-primary-700 w-fit border-b-2 pb-1 text-xs font-medium tracking-wide text-white"
                  aria-describedby={`${menuItem.id}-heading`}
                >
                  More Information
                  <span className="sr-only">about {menuItem.title}</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Sağ Taraf - Linkler */}
          <ul className="group/alt sidebar -mt-4 flex w-full flex-col items-start justify-start gap-x-6 gap-y-2 px-4 lg:max-h-[320px] lg:w-full lg:overflow-y-auto xl:h-fit xl:flex-row xl:flex-wrap xl:gap-y-8">
            {menuItem.links.map((link, linkIndex) => (
              <SubMenuLinkItem key={linkIndex} link={link} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const SubMenuLinkItem: React.FC<{
  link: MenuItemLink;
}> = ({ link }) => (
  <li className="relative h-fit w-full xl:max-w-[312px]">
    <Link
      to={link.url}
      className="group/el block py-4 transition-all duration-300 ease-in-out hover:text-red-600 hover:!opacity-100 group-hover/alt:[&:not(:hover)]:opacity-60"
    >
      <div className="flex items-center justify-between lg:w-auto">
        <h3 className="text-gray-950 lg:line-clamp-1">{link.name}</h3>
        <ChevronRight className="text-primary-700 size-5" />
      </div>
      <div className="group-hover/el:bg-primary-700 absolute bottom-0 left-0 h-px w-full bg-gray-200 transition-all duration-300 group-hover/el:h-[1.5px]" />
    </Link>
  </li>
);

import React, { useState } from "react";
import { Menu, X, Smartphone } from "lucide-react";
import { NAV_LINKS } from "../constants";
import { PageType } from "../App";

interface NavbarProps {
  scrolled: boolean;
  currentPage: PageType;
  navigate: (page: PageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, currentPage, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDarkNav = scrolled || currentPage !== "home";

  const handleLinkClick = (name: string) => {
    switch (name) {
      case "Home":
        navigate("home");
        break;
      case "Delivery Partner":
        navigate("partner");
        break;
      case "Add Store":
        navigate("store");
        break;
      case "Partnership":
        navigate("partnership");
        break;
      case "Contact Us":
        navigate("contact");
        break;
      case "Trust":
        navigate("trust");
        break;
      case "About Us":
        navigate("about");
        break;
      default:
        break;
    }

    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkNav ? "bg-white shadow-md py-3" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="cursor-pointer flex items-center"
          onClick={() => {
            navigate("home");
            setMobileMenuOpen(false);
          }}
        >
          <img
            src="/assets/Bhukk_without_bg.png"
            alt="Bhukk logo"
            className="h-8 w-8 md:h-10 md:w-9 -mr-1"
          />
          <span
            className={`text-2xl md:text-3xl font-black italic tracking-tighter transition-colors ${
              isDarkNav ? "text-[#981A1E]" : "text-white"
            }`}
          >
            hukk
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <div
            className={`flex items-center gap-8 text-lg ${
              isDarkNav ? "text-[#696969]" : "text-white font-light"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.name)}
                className={`hover:opacity-70 transition-opacity ${
                  (link.name === "Home" && currentPage === "home") ||
                  (link.name === "Delivery Partner" &&
                    currentPage === "partner") ||
                  (link.name === "Add Store" && currentPage === "store") ||
                  (link.name === "Partnership" &&
                    currentPage === "partnership") ||
                  (link.name === "Contact Us" && currentPage === "contact") ||
                  (link.name === "Trust" && currentPage === "trust") ||
                  (link.name === "About Us" && currentPage === "about")
                    ? "text-[#E23744] font-semibold"
                    : ""
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Get App */}
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("show-coming-soon"))
            }
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border ${
              isDarkNav
                ? "text-[#1C1C1C] border-gray-200"
                : "text-white border-white/20"
            } hover:opacity-90 transition-colors`}
          >
            <Smartphone size={16} />
            <span>Get App</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={isDarkNav ? "text-black" : "text-white"} />
          ) : (
            <Menu className={isDarkNav ? "text-black" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl py-6 px-4 md:hidden animate-fade-in-down border-t border-gray-100">
          <div className="flex flex-col gap-6 text-xl text-[#696969]">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.name)}
                className="text-left hover:text-black"
              >
                {link.name}
              </button>
            ))}

            <hr className="border-gray-100" />

            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("show-coming-soon"))
              }
              className="flex items-center gap-2 text-sm"
            >
              <Smartphone size={18} />
              Get the App
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

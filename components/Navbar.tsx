import React, { useState } from "react";
import { Menu, X, Smartphone } from "lucide-react";
import { NAV_LINKS } from "../constants";
import { PageType } from "../App";

interface NavbarProps {
  scrolled: boolean;
  setPage: (page: PageType) => void;
  currentPage: PageType;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, setPage, currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDarkNav = scrolled || currentPage !== "home";

  const handleLinkClick = (name: string) => {
    if (name === "Trust") {
      setPage("trust");
    } else if (name === "Delivery Partner") {
      setPage("partner");
    } else if (name === "Home") {
      setPage("home");
    } else if (name === "Add Store") {
      setPage("store");
    } else if (name === "Partnership") {
      setPage("partnership");
    } else if (name === "Contact Us") {
      setPage("contact");
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
            setPage("home");
            setMobileMenuOpen(false);
          }}
        >
          <img
            src="/assets/Bhukk_without_bg.png"
            alt="Bhukk logo"
            className="h-8 w-8 md:h-10 md:w-9 mr-1"
          />
          <span
            className={`text-2xl md:text-3xl font-black italic tracking-tighter transition-colors ${
              isDarkNav ? "text-[#E23744]" : "text-white"
            }`}
          >
            bhukk
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
                  (link.name === "Delivery Partner" &&
                    currentPage === "partner") ||
                  (link.name === "Home" &&
                    currentPage === "home" &&
                    isDarkNav) ||
                  (link.name === "Add Store" && currentPage === "store") ||
                  (link.name === "Partnership" &&
                    currentPage === "partnership") ||
                  (link.name === "Contact Us" && currentPage === "contact") ||
                  (link.name === "Trust" && currentPage === "trust")
                    ? "text-[#E23744] font-semibold"
                    : ""
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border ${
              isDarkNav
                ? "text-[#1C1C1C] border-gray-200"
                : "text-white border-white/20"
            }`}
          >
            <Smartphone size={16} />
            <a href="#" className="hover:opacity-80 transition-opacity">
              Get App
            </a>
          </div>
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
            <a href="#" className="flex items-center gap-2 text-sm">
              <Smartphone size={18} />
              Get the App
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
} from "lucide-react";
import { FOOTER_SECTIONS } from "../constants";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
      <div className="max-w-[1100px] mx-auto px-4 md:px-0">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="/assets/Bhukk_without_bg.png"
              alt="Bhukk logo"
              className="h-8 w-8 md:h-10 md:w-10 mr-1"
            />
            <h2 className="text-3xl font-black italic tracking-tighter text-[#1C1C1C]">
              bhukk
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              <Globe size={16} /> India
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              English
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {FOOTER_SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-sm font-semibold text-[#1C1C1C] tracking-widest">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href="#"
                      className="text-[#696969] text-sm hover:text-black transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social and App Store Links */}
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#1C1C1C] tracking-widest uppercase">
                Social Links
              </h4>
              <div className="flex gap-2 text-white">
                {[Linkedin, Instagram, Twitter, Youtube, Facebook].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="bg-[#1C1C1C] p-2 rounded-full hover:bg-[#E23744] transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <img
                src="/assets/playstore.png"
                alt="Play Store"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("show-coming-soon"))
                }
                className="h-16 cursor-pointer"
              />
              <img
                src="/assets/App.png"
                alt="App Store"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("show-coming-soon"))
                }
                className="h-16 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100">
          <p className="text-[#9C9C9C] text-xs leading-relaxed">
            By continuing past this page, you agree to our Terms of Service,
            Cookie Policy, Privacy Policy and Content Policies. All trademarks
            are properties of their respective owners. Bhukk ensures strict
            legal age compliance for all liquor deliveries. 2024-2025 © Bhukk™
            Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

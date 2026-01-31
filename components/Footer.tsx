import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
} from "lucide-react";

const Footer: React.FC = () => {
  const navigate = (page: string) => {
    window.location.hash = page;
  };

  return (
    <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
      <div className="max-w-[1100px] mx-auto px-4 md:px-0">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("home")}
          >
            <img
              src="/assets/Bhukk_without_bg.png"
              alt="Bhukk logo"
              className="h-8 w-8 md:h-10 md:w-10 -mr-1"
            />
            <h2 className="text-3xl font-black italic tracking-tighter text-[#1C1C1C]">
              hukk
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
          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#1C1C1C] tracking-widest">
              COMPANY
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate("home")}
                  className="text-[#696969] text-sm hover:text-black transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("trust")}
                  className="text-[#696969] text-sm hover:text-black transition-colors"
                >
                  Trust & Safety
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("contact")}
                  className="text-[#696969] text-sm hover:text-black transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#1C1C1C] tracking-widest">
              PARTNERS
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate("partner")}
                  className="text-[#696969] text-sm hover:text-black transition-colors"
                >
                  Delivery Partners
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("store")}
                  className="text-[#696969] text-sm hover:text-black transition-colors"
                >
                  Retailers & Stores
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => navigate("partnership")}
                  className="text-[#696969] text-sm hover:text-black transition-colors"
                >
                  Partnerships
                </button>
              </li> */}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#1C1C1C] tracking-widest">
              LEGAL
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate("trust")}
                  className="text-[#696969] text-sm hover:text-black transition-colors"
                >
                  Compliance & Licensing
                </button>
              </li>
              <li>
                <span className="text-[#696969] text-sm">Privacy Policy</span>
              </li>
              <li>
                <span className="text-[#696969] text-sm">Terms of Service</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#1C1C1C] tracking-widest">
              SUPPORT
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate("contact")}
                  className="text-[#696969] text-sm hover:text-black transition-colors"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("contact")}
                  className="text-[#696969] text-sm hover:text-black transition-colors"
                >
                  Report an Issue
                </button>
              </li>
            </ul>
          </div>

          {/* Social + App */}
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
            Bhukk is a technology platform enabling licensed beverage retailers,
            distributors, and delivery partners to connect with customers.
            Alcohol delivery is subject to state laws and legal age
            verification. © 2024–2025 Bhukk™. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

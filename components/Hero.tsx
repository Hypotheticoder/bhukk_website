import React from "react";
import {
  Smartphone,
  PlayCircle,
  ChevronDown,
  Store,
  Truck,
  Package,
  UserPlus,
} from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
        style={{ backgroundImage: 'url("/assets/hero.png")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl w-full">
        {/* Branding */}
        <h1 className="text-white text-6xl sm:text-7xl md:text-8xl font-black italic tracking-tighter mb-6 drop-shadow-2xl animate-fade-in-up">
          bhukk
        </h1>

        {/* Headlines */}
        <h2
          className="text-white text-2xl sm:text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg animate-fade-in-up opacity-0"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          India's Smartest Beverages Delivery App
        </h2>

        <p
          className="text-white/90 text-base sm:text-lg md:text-xl font-light mb-10 drop-shadow-md animate-fade-in-up opacity-0"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          Fast, legal & reliable beverages delivery at your doorstep
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col items-center gap-6 animate-fade-in-up opacity-0"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          {/* App buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("show-coming-soon"))
              }
              className="
                w-full sm:w-auto
                flex items-center justify-center gap-3
                bg-white text-[#1C1C1C]
                px-6 py-3 sm:px-8 sm:py-4
                rounded-xl font-semibold text-base sm:text-lg
                hover:bg-gray-100 transition
                active:scale-[0.97]
                shadow-xl
              "
            >
              <PlayCircle className="text-[#E23744]" />
              Get it on Google Play
            </button>

            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("show-coming-soon"))
              }
              className="
                w-full sm:w-auto
                flex items-center justify-center gap-3
                bg-white text-[#1C1C1C]
                px-6 py-3 sm:px-8 sm:py-4
                rounded-xl font-semibold text-base sm:text-lg
                hover:bg-gray-100 transition
                active:scale-[0.97]
                shadow-xl
              "
            >
              <Smartphone className="text-[#E23744]" />
              Download on App Store
            </button>
          </div>

          {/* Partner section */}
          <div className="w-full flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-white text-center">
              <UserPlus className="text-[#E23744]" />
              <span className="font-semibold text-base sm:text-lg">
                Become a Bhukk Partner — Become a partner as
              </span>
            </div>

            {/* Partner buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Retailers", Icon: Store, section: "retailer" },
                {
                  label: "Manufacturers",
                  Icon: Package,
                  section: "manufacturer",
                },
                { label: "Distributors", Icon: Truck, section: "distributor" },
              ].map(({ label, Icon, section }) => (
                <button
                  key={label}
                  onClick={() => {
                    sessionStorage.setItem("scrollToSection", section);
                    window.location.hash = "store";
                    window.dispatchEvent(
                      new CustomEvent("scrollToPartnerSection"),
                    );
                  }}
                  className="
                    flex items-center gap-3
                    border border-white/30
                    text-white
                    px-5 py-3
                    rounded-xl font-semibold text-sm sm:text-base
                    hover:bg-white hover:text-[#1C1C1C]
                    transition
                    active:scale-[0.97]
                    min-w-[140px]
                  "
                >
                  <Icon className="text-[#E23744]" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="
    absolute bottom-8 sm:bottom-10
    inset-x-0
    flex justify-center
    pointer-events-none
  "
      >
        <div className="flex flex-col items-center gap-1 text-white/60 animate-bounce">
          <span className="text-xs uppercase tracking-widest font-medium">
            Scroll down
          </span>
          <ChevronDown size={20} />
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React from "react";
import { Smartphone, PlayCircle, ChevronDown } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        {/* Branding */}
        <h1 className="text-white text-7xl md:text-8xl font-black italic tracking-tighter mb-8 drop-shadow-2xl animate-fade-in-up">
          bhukk
        </h1>

        {/* Headlines */}
        <h2
          className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg animate-fade-in-up delay-100 opacity-0"
          style={{ animationFillMode: "forwards" }}
        >
          India's Smart Liquor Delivery App
        </h2>
        <p
          className="text-white/90 text-lg md:text-xl font-light mb-12 drop-shadow-md animate-fade-in-up delay-200 opacity-0"
          style={{ animationFillMode: "forwards" }}
        >
          Fast, legal & reliable alcohol delivery at your doorstep
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300 opacity-0"
          style={{ animationFillMode: "forwards" }}
        >
          <button className="flex items-center gap-3 bg-white text-[#1C1C1C] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-xl">
            <PlayCircle className="text-[#E23744]" />
            Get it on Google Play
          </button>
          <button className="flex items-center gap-3 bg-white text-[#1C1C1C] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-xl">
            <Smartphone className="text-[#E23744]" />
            Download on App Store
          </button>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 animate-bounce flex flex-col items-center gap-1">
        <span className="text-xs uppercase tracking-widest font-medium">
          Scroll down
        </span>
        <ChevronDown size={20} />
      </div>
    </div>
  );
};

export default Hero;
